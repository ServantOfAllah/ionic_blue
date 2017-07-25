import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public userDetails: any;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {
      
    
    
    const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    console.log('from list page...', this.userDetails.groups);
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select a Query',
      buttons:[
        {
          text: 'Send a request',
          role: 'Destructive', 
          handler: () => {
            this.navCtrl.push('SendRequestPage');
            console.log('destructive clicked');
          }
        },
        {
          text: 'Make a suggestion', 
          role: 'Destructive', 
          handler: () => {
            this.navCtrl.push('SuggestionPage');
            console.log('suggestion clicked');
          }
        },
        {
          text: 'Ask for support', 
          role: 'Destructive', 
          handler: () => {
            console.log('support clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
