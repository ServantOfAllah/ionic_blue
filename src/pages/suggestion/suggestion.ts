import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {

  userDetails: any;
  comment: string;

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    console.log("from suggestionpage", this.userDetails)
    console.log('ionViewDidLoad SuggestionPage');
  }

  saveSuggestion(){
    var data = {
      user: this.userDetails.username,
      comment: this.comment
    }
    if(data.user && data.comment){
      //save to to database
    }else{
        let toast = this.toastCtrl.create({
        message: 'Fields cannot be empty',
        duration: 2000
      });
      toast.present();
    }
  }



}
