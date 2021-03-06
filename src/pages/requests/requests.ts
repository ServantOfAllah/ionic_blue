import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  public userDetails: any;
  public responseData: any;
  public dataSet: any;
  userPostData: any;

  constructor(private toastCtrl: ToastController, private authService: AuthServiceProvider, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData = {
      "user_id": this.userDetails.user_id, 
      "token": this.userDetails.token
    };
    this.getFeed();

    console.log("from request page in constructor")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
  }

  doRefresh(refresher){
    this.getFeed();
    setTimeout(() => {
      console.log('update has ended');
      refresher.complete();
    }, 2000);
  }

  getFeed(){
    this.authService.postData(this.userPostData, "feed").then((result)=>{
      this.responseData = result;
      if(this.responseData.feedData){
        console.log("response", this.responseData);
        this.dataSet = this.responseData.feedData;
        console.log("datasets", this.dataSet);
      }
      else{
        let toast = this.toastCtrl.create({
        message: 'No request has been made yet...',
        duration: 4000
      });
      toast.present();
      }
    }, (err)=>{
      let toast = this.toastCtrl.create({
        message: 'Unable to connect to database',
        duration: 4000
      });
      toast.present();
    });
  }

}
