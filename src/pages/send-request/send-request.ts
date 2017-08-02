import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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

  constructor(private loadCtrl: LoadingController, private authService: AuthServiceProvider, private toastCtrl: ToastController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

  }

  requestedItems(){
    //console.log(this.request);
  }

  presentLoading(){
    let loader = this.loadCtrl.create({
      spinner:'dots',
      content: 'Please wait',
      duration: 2500
    });
    loader.present();

    setTimeout(()=>{
      let toast1 = this.toastCtrl.create({
        message: 'Request was created successfully',
        duration: 2000
      });
      toast1.present();
    })
    setTimeout(() => {
    this.navCtrl.setRoot('TabsPage');
    }, 3000);
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
        
      userRequest.comments == "";
      this.presentLoading();
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
