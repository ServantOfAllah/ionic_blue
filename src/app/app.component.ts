import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  rootPage:string = 'LoginPage';
  @ViewChild(Nav) nav: Nav;

  public userDetails: any;

  isUserData = false;

  constructor(private modalCtrl:ModalController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    console.log("app page:", data);
    this.userDetails = data.userData;
    if(this.userDetails != 'undefined'){
      this.isUserData = !this.isUserData;
    }else{
      this.isUserData = false
    }
    console.log("first:", this.userDetails);
    console.log("second:", this.userDetails.name);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToRequest(){
    this.nav.setRoot('RequestsPage'); 
  }

  goToHome(){
    this.nav.push('TabsPage');

    // const data = JSON.parse(localStorage.getItem('userData'));
    // console.log("app page:", data);
    // this.userDetails = data.userData;
    // if(this.userDetails != 'undefined'){
    //   this.isUserData = !this.isUserData;
    // }else{
    //   this.isUserData = false
    // }
    // console.log("first:", this.userDetails);
    // console.log("second:", this.userDetails.name); 
  }

  goToSuggestion(){
    this.nav.setRoot('SuggsestList');
  }

  openVisitModal(){
    // const visitorModal = this.modalCtrl.create('Visitors');
    // visitorModal.present();
  }

  backToLogin(){
    this.nav.setRoot('LoginPage');
  }

  goToVisitorsList(){
    this.nav.setRoot('VisitorsList');
  }

  logout(){
    setTimeout(()=>this.backToLogin, 1000);
    this.nav.setRoot('LoginPage');
    localStorage.clear();
  }

}

