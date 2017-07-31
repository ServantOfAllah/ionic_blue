import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {

  userDetails: any;
  comment: any;
  responseData: any;
  // sugData = { 
  //   "sug_user":"", 
  //   "sug_comment":"" 
  // };

  constructor(private loadCtrl: LoadingController, private authService: AuthServiceProvider, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    console.log("from suggestionpage", this.userDetails)
    console.log('ionViewDidLoad SuggestionPage');
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
        message: 'Suggestion created successfully',
        duration: 2000
      });
      toast1.present();
    })
    setTimeout(() => {
    this.navCtrl.setRoot('TabsPage');
    }, 3000);
  }

  saveSuggestion(){
    var data = {
      user: this.userDetails.username,
      comments: this.comment
    };

    if(data.user && data.comments != ""){
      //save to to database

      console.log("from suggestion page ", data.comments);
      console.log("from suggestion page ", data.user);
      
    }else{
        let toast = this.toastCtrl.create({
        message: 'Fields cannot be empty',
        duration: 2000
      });
      toast.present();
      return false;
    }
  }

  validationToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  saveSuggest(){
    var sugData = {
      sug_user: this.userDetails.user_id,
      sug_comment: this.comment
    };

    console.log("Response data comment", sugData.sug_user);
    console.log("Response data comment", sugData.sug_comment);

    if(sugData.sug_comment){ 
      this.authService.postData(sugData, 'suggest').then((result)=>{
          this.responseData = result;
          console.log("Response data",this.responseData); 
        }, (err)=>{

      });

      this.presentLoading();

    }else{
        let toast = this.toastCtrl.create({
        message: 'Comment field cannot be blank',
        duration: 2000
      });
      toast.present();
    }
  }


}
