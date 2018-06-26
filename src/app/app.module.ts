import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data';
import { DataParamsProvider } from '../providers/data-params';

declare var google;

const firebaseConfig = {
  apiKey: 'AIzaSyBMOkQN6cd9fzlnj4LlK1GKQH-Yfip8Zfg',
  authDomain: 'design-by-contract-demo.firebaseapp.com',
  databaseURL: 'https://design-by-contract-demo.firebaseio.com',
  projectId: 'design-by-contract-demo',
  storageBucket: '',
  messagingSenderId: '610004631173'
};

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NgxQRCodeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCj2zfQbZNoR5y7p4ciApcBsqiufha2GBc',
      libraries: ['places']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    Geolocation,
    Network,
    DataProvider,
    DataParamsProvider
  ]
})
export class AppModule {}
