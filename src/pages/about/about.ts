import { Component } from '@angular/core';
import { NavController, AlertController, Tabs, Tab } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataParamsProvider } from '../../providers/data-params';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  scannedCode: any = null;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    public params: DataParamsProvider
  ) {}

  scanCode() {
    this.barcodeScanner.scan().then(
      async barcodeData => {
        this.scannedCode = barcodeData.text;
        let alertObject = this.alertCtrl.create({
          title: 'Scanned Code',
          subTitle: this.scannedCode,
          buttons: ['OK']
        });
        await alertObject.present();
        this.params.params = this.scannedCode;
        this.params.updateTabEnabled = true;
        const tabs = this.navCtrl.parent as Tabs;
        tabs.select(2).then(res => {
          tabs.getSelected().enabled = true;
        });
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }
}
