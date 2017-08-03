import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ActionSheetController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public userDetails: any;
  canCreate = false;

  constructor(private modalCtrl:ModalController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {    
    const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.canCreateVisitors();
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
          text: 'Ask for support', 
          role: 'Destructive', 
          handler: () => {
            console.log('support clicked');
            this.navCtrl.push('SendSupport');
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
          text: 'Send a request',
          role: 'Destructive', 
          handler: () => {
            this.navCtrl.push('SendRequestPage');
            console.log('destructive clicked');
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

  canCreateVisitors(){
    let user = this.userDetails.can_create
    if(user != false){
      this.canCreate = !this.canCreate;
    }
  }

  createVisitors(){
    const visitorModal = this.modalCtrl.create('Visitors');
    visitorModal.present();
  }

}
