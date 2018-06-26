import { Injectable } from '@angular/core';

@Injectable()
export class DataParamsProvider {
  params: any;
  constructor() {
    console.log('Hello DataParamsProvider Provider');
    this.params = {};
  }
}
