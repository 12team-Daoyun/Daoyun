import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // 在html文件中无法访问到
  private storage: any = window.localStorage;
  constructor() { }

  // any类型，可以不传值
  get(key: string, defaultValue: any): any {
    // 从本地存储中获取key的值,let为局部变量声明
    let value: any = this.storage.getItem(key);
    try {
      // 转换value
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    // 如果value为空且defalueValue有值
    if (value == null && defaultValue) {
      // 为value赋值
      value = defaultValue;
    }
    return value;
  }

  set(key: string, appCfg: any) {
    this.storage.setItem(key, JSON.stringify(appCfg));
  }

  update(key: string, newValue: any) {

  }
}


