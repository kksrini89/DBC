import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  showSplash: Boolean = true;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alert: AlertController,
    public network: Network
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.listenConnection();
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => (this.showSplash = false));
    });
  }
  private listenConnection(): void {
    this.network.onDisconnect().subscribe(() => {
      let alertCtrl = this.alert.create({
        title: 'Network Connection',
        subTitle: 'Lost!',
        buttons: ['OK']
      });
      alertCtrl.present();
    });
  }
}
