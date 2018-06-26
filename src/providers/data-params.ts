import { Injectable } from '@angular/core';

@Injectable()
export class DataParamsProvider {
  params: any;
  updateTabEnabled: Boolean = false;
  constructor() {
    console.log('Hello DataParamsProvider Provider');
    this.params = {};
    this.updateTabEnabled = false;
  }
}
