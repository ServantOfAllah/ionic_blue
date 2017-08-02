import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-send-support',
  templateUrl: 'send-support.html',
})
export class SendSupport {

  userDetails: any;
  userRequests: any;
  support: string;
  comment: any;
  responseData: any;
  userReq: string;

  Support_list = ["Software", "Hardware", "MS-Office", "ERP"];

  constructor(private loadCtrl: LoadingController, private authService: AuthServiceProvider, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  supportList(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendSupport');
  }

  saveSupport(){
    var userRequest = {
      sup_user: this.userDetails.user_id,
      sup_type: this.support,
      sup_comments: this.comment
    };
    console.log("req info ", userRequest );

    if(userRequest.sup_comments && userRequest.sup_type){
      //saving the requests to an array / DB
      this.authService.postData(userRequest, 'support').then((result)=>{
          this.responseData = result;
          console.log("Response data", this.responseData); 
        }, (err)=>{

      });
        
      userRequest.sup_comments == "";
      this.presentLoading();
    }else{
        let toast = this.toastCtrl.create({
        message: 'Fields cannot be empty',
        duration: 2000
      });
      toast.present();
    }

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
        message: 'Support was submitted successfully',
        duration: 2000
      });
      toast1.present();
    })
    setTimeout(() => {
    this.navCtrl.setRoot('TabsPage');
    }, 3000);
  }

}
