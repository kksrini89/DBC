import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import { DataParamsProvider } from '../../providers/data-params';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  customerForm: any = {};
  locationDisabled: Boolean = false;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public params: DataParamsProvider,
    public dataService: DataProvider,
    public geolocation: Geolocation,
    public network: Network
  ) {
    let value = this.params.params;
    const passedParam = JSON.parse(value);
    this.customerForm.id = passedParam.id;
    this.customerForm.name = passedParam.name;
    this.customerForm.location = passedParam.location;
    this.customerForm.indoor = passedParam.indoor;
    this.customerForm.outdoor = passedParam.outdoor;
    this.customerForm.fridge = passedParam.fridge;
  }

  ionViewWillEnter() {
    this.loadLocation();
  }

  private loadLocation() {
    this.geolocation.getCurrentPosition().then(res => {
      if (
        res.coords.latitude == this.customerForm.location.latitude &&
        res.coords.longitude == this.customerForm.location.longitude
      ) {
        let alertCtrl = this.alertCtrl.create({
          title: 'Location Matched',
          subTitle: 'You can edit the location',
          buttons: ['OK']
        });
        alertCtrl.present();
      } else {
        let alertCtrl = this.alertCtrl.create({
          title: 'Location Not Matched',
          subTitle: 'You can not edit the location',
          buttons: ['OK']
        });
        alertCtrl.present();
        this.locationDisabled = true;
      }
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if (
        data.coords.latitude == this.customerForm.location.latitude &&
        data.coords.longitude == this.customerForm.location.longitude
      ) {
        let alertCtrl = this.alertCtrl.create({
          title: 'Location Matched',
          subTitle: 'You can edit the location',
          buttons: ['OK']
        });
        alertCtrl.present();
      } else {
        let alertCtrl = this.alertCtrl.create({
          title: 'Location Not Matched',
          subTitle: 'You can not edit the location',
          buttons: ['OK']
        });
        alertCtrl.present();
        this.locationDisabled = true;
      }
    });
  }

  async updateValue() {
    await this.dataService.updateCustomer(this.customerForm);
    let alertCtrl = this.alertCtrl.create({
      title: 'Success',
      subTitle: `Updated!`,
      buttons: ['OK']
    });
    await alertCtrl.present();
  }
}
