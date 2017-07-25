import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-announce',
  templateUrl: 'announce.html',
})
export class AnnouncePage {
  announceList: FirebaseListObservable<any[]>
  fetchData: any;
  titleValue: any;
  bodyValue: any;
  userDetails: any;
  showDetails: boolean=false;
  icon: string;
  //timestamp = Firebase.ServerValue.TIMESTAMP;

  canCreate = false;

  constructor(private toastCtrl: ToastController, private firebaseService: FirebaseServiceProvider, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController) {
    this.announceList = this.firebaseService.getAnnouncement();
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.canCreateAnnounce();
    // localStorage.setItem('announceData', JSON.stringify(this.announceList));
    // this.storeItem();
    this.icon = 'ios-add-circle-outline';
  }

  canCreateAnnounce(){
    let user = this.userDetails.can_create
    if(user != false){
      this.canCreate = !this.canCreate;
    }
    console.log("from can create method ", typeof(user));
    console.log("from can create method ",user) 
    console.log("from can create method", this.canCreate);
  }

  // storeItem(){
  //   const FBdata = JSON.parse(localStorage.getItem('announceData'));
  //   this.fetchData = FBdata.announcedData;
  //   console.log(this.fetchData);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncePage');
    console.log("from announce page", this.userDetails.groups);
    console.log("from announce page", this.userDetails.can_create);
  }

  addAnnouncement(){
    //this.firebaseService.addAnnouncement(this.newAnnouncement.title, this.newAnnouncement.body);
    this.firebaseService.addAnnouncement(this.titleValue, this.bodyValue);
  }
  removeAnnouncement(id){
    let user = this.userDetails.can_create
    if(user != false){
      this.firebaseService.removeAnnouncement(id);
    }
  }

  togggleDetails(data){
    if(data.showDetails){
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    }else{
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  expandDiv(){
    let maxLetter = 50;
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Announcement was added successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  validationToast() {
    let toast = this.toastCtrl.create({
      message: 'Title and body field cannot be empty',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  presentPrompt(){
    var alert = this.alertCtrl.create({
      title: 'create a post',
      inputs:[
        {
          name: 'Title',
          type: 'string',
          placeholder: 'title'
        },
        {
          name: 'Body',
          type: 'string',          
          placeholder: 'post...',
          
        }
      ],

      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'alertBtn',
          handler: data => {
            console.log('cancelled');
          }
        },
        {
          text: 'Confirm',
          cssClass: 'alertBtn{ background-color: #fff333; padding: 45px; }',
          handler: data => {
            this.titleValue = data.Title;
            this.bodyValue = data.Body;
            if(this.titleValue !== '' || this.bodyValue !== ''){
              this.addAnnouncement();
              this.successToast();
            }else{
              this.validationToast();
              return false;
            }
            console.log(this.titleValue);
            console.log(this.bodyValue);
          }
        }
      ]
    });
    alert.present();
  }

  toggleSection(i){
    this.announceList[i].open = !this.announceList[i].open;
  }

  createAnnouncement(): void {
    //this.navCtrl.push('CreateAnnouncementPage');
    this.presentPrompt();
  }

}
