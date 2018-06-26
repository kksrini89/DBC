import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { DataProvider, User } from '../../providers/data';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Google maps - Start
  public latitude: number;
  public longitude: number;
  public zoom: number;

  // Google maps - End

  qrData = null;
  createdCode = null;

  customer: any = {
    name: '',
    location: {
      text: '',
      latitude: 39.8282,
      longitude: -98.5795
    }
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public dataService: DataProvider,
    private mapsAPILoader: MapsAPILoader,
    private geoLoc: Geolocation,
    private ngZone: NgZone
  ) {}

  async createCode() {
    let newCustomer: User = {
      name: this.customer.name,
      location: this.customer.location,
      indoor: 'positive',
      outdoor: 'positive',
      fridge: 'positive'
      // isMixyChecked: false,
      // isWellChecked: false
    };
    const customer = await this.dataService.addToDatabase(newCustomer);
    this.createdCode = JSON.stringify(customer);
    let alertCtrl = this.alertCtrl.create({
      title: 'New Customer!',
      subTitle: 'Data is saved!',
      buttons: ['OK']
    });
    alertCtrl.present();
  }

  isValid(): Boolean {
    return (
      this.customer.name !== '' &&
      this.customer.location.latitude != '' &&
      this.customer.location.longitude != ''
    );
  }

  ionViewWillEnter() {
    // this.setCurrentPosition();
    this.geoLoc.getCurrentPosition().then(res => {
      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;
    });
  }

  ionViewDidLoad() {
    this.zoom = 12;
    this.latitude = 9.939093;
    this.longitude = 78.121719;

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('location').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.customer.location.text = place.name;
          this.customer.location.latitude = this.latitude;
          this.customer.location.longitude = this.longitude;
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
