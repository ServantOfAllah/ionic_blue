import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-suggsest-list',
  templateUrl: 'suggsest-list.html',
})
export class SuggsestList {

  public userDetails: any;
  public responseData: any;
  public dataSet: any;
  userPostData: any;

  constructor(private toastCtrl: ToastController, private authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData = {
      "user_id": this.userDetails.user_id, 
      "token": this.userDetails.token
    };
    console.log(this.userPostData);
    this.getFeed();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggsestList');
  }

  doRefresh(refresher){
    this.getFeed();
    setTimeout(() => {
      console.log('update has ended');
      refresher.complete();
    }, 2000);
  }

  getFeed(){
    this.authService.postData(this.userPostData, "feedSuggest").then((result)=>{
      this.responseData = result;
      if(this.responseData.feedData){
        console.log("response", this.responseData);
        this.dataSet = this.responseData.feedData;
        console.log("datasets", this.dataSet);
      }
      else{
        let toast = this.toastCtrl.create({
        message: 'No suggestion has been made yet...',
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
