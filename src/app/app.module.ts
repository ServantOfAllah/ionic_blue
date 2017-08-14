import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TwitterService } from 'ng2-twitter';

import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { TwitterProvider } from '../providers/twitter/twitter';
import { ValidatorsProvider } from '../providers/validators/validators';

import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule} from 'angularfire2';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Network } from '@ionic-native/network';

const firebaseConfig = {
    apiKey: "AIzaSyAEcgTxdDIbpoflr2vlkr_26pqTV40fChk",
    authDomain: "blue-d786d.firebaseapp.com",
    databaseURL: "https://blue-d786d.firebaseio.com",
    projectId: "blue-d786d",
    storageBucket: "",
    messagingSenderId: "127976518620"
  };

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
    //Storage.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    InAppBrowser,
    TwitterService,
    TwitterProvider,
    ValidatorsProvider,
    FirebaseServiceProvider,
    AuthServiceProvider
  ]
})

export class AppModule {}
