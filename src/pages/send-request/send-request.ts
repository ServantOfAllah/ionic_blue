import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-send-request',
  templateUrl: 'send-request.html',
})
export class SendRequestPage {

  userDetails: any;
  userRequests: any;
  request: any;
  comment: any;
  isBtnActive: boolean = false;

  Request_items = ["laptop", "mobile", "simcard"];
  requestArr = [];

  constructor(private toastCtrl: ToastController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

  }

  requestedItems(){
    //console.log(this.request);
  }

  saveRequest(){
    var data = {
      comments: this.comment,
      owner: this.userDetails.username,
      requests: this.request
    };

    if(data.comments && data.requests.length > 0){
      this.isBtnActive = true;
      //saving the requests to an array
      this.requestArr.unshift(data);
      console.log(this.requestArr);
      //saving the array to localstorage
      localStorage.setItem('userRequestArray', JSON.stringify(this.requestArr));
      this.comment = "";
      this.request.length == 0;

      console.log("from send request page", this.request);
      console.log("from send request page", this.comment);
      console.log("from send request page", this.userDetails.username);

      this.navCtrl.push('RequestsPage', data);
    }else{
        this.isBtnActive = false;
        let toast = this.toastCtrl.create({
        message: 'Fields cannot be empty',
        duration: 2000
      });
      toast.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendRequestPage');
  }

}
