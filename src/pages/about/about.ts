import { Component } from '@angular/core';
import { NavController, AlertController, Tabs } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataParamsProvider } from '../../providers/data-params';
// import { ContactPage } from '../contact/contact';

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
        (this.navCtrl.parent as Tabs).select(2);

      },
      err => {
        console.log('Error: ', err);
      }
    );
  }
}
