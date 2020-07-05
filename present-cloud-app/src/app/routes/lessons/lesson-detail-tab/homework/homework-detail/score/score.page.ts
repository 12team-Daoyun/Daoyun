import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  workid;
  files;
  constructor(private transfer: FileTransfer, private file: File, private modalController: ModalController, private http: HttpClient) {
    this.files = JSON.parse(localStorage.getItem('files'));
   }
  fileTransfer: FileTransferObject = this.transfer.create();
  ngOnInit() {
    this.dismissModal();
    console.log(this.files);
  }

  downloadFile(classId, workId, userId, fileName) {
    console.log(this.file.dataDirectory);
    const url = Constants.downloadHomeworkUrl + '?classId=' + classId + '&workId=' + workId + '&userId=' + userId;
    this.fileTransfer.download(url, this.file.externalDataDirectory + fileName).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
    this.fileTransfer.onProgress(progressEvent => {
      if (progressEvent.lengthComputable) {
        // 下载过程会一直打印，完成的时候会显示 1
        console.log(progressEvent.loaded / progressEvent.total);
      } else {
      }
    });
  }

  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => { this.modalController = null; });
    }
  }
}
