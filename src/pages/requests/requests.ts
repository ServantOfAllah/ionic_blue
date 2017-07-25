import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  userDetails: any;
  comments: any;
  owners: any;
  requests: any;
  requestArr = [];

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data;

    const comment = this.navParams.get('comments');
    this.comments = comment;
    const owner = this.navParams.get('owner');
    this.owners = owner;
    const request = this.navParams.get('requests');
    this.requests = request;

    //getting the request to a local storage and saving to a variable
    const data2 = JSON.parse(localStorage.getItem('userRequestArray'))
    this.requestArr = data2;

    console.log("from request page in constructor", this.requestArr)

  }

  ionViewDidLoad() {
    console.log("from request page", this.requestArr)

    console.log(this.comments);
    console.log(this.owners);
    console.log(this.requests);

    console.log('ionViewDidLoad RequestsPage');
  }

}
