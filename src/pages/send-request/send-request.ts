import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-send-request',
  templateUrl: 'send-request.html',
})
export class SendRequestPage {

  userDetails: any;
  userRequests: any;
  request: string;
  comment: any;
  isBtnActive: boolean = false;
  responseData: any;
  userReq: string;

  Request_items = ["laptop", "mobile", "simcard"];
  requestArr = [];

  constructor(private authService: AuthServiceProvider, private toastCtrl: ToastController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    console.log("from requeest constructor ", this.request);

  }

  requestedItems(){
    //console.log(this.request);
  }

  saveRequest(){
    var userRequest = {
      req_user: this.userDetails.user_id,
      req_item: this.request,
      comments: this.comment
    };
    
    console.log("req info ", userRequest );

    if(userRequest.comments && userRequest.req_item){
      //saving the requests to an array / DB
      this.authService.postData(userRequest, 'request').then((result)=>{
          this.responseData = result;
          console.log("Response data", this.responseData); 
        }, (err)=>{

      });

      this.requestArr.unshift(userRequest);
      console.log(this.requestArr);

      //pushing the user erequests to the next page
      this.navCtrl.push('RequestsPage', userRequest);
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
