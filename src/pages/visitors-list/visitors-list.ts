import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-visitors-list',
  templateUrl: 'visitors-list.html',
})
export class VisitorsList {

  @Output() len: EventEmitter<number> = new EventEmitter<number>();
  public userDetails: any;
  public responseData: any;
  userPostData: any;
  visitorSet: any;
  icon: string;
  resLenght: any;
  public keys: any;

  constructor(private authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData = {
      "user_id": this.userDetails.user_id, 
      "token": this.userDetails.token
    }
    
    this.getVisitors();
    this.icon = 'ios-add';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorsList');
  }

  togggleDetails(data){
    data.icon = 'ios-add';
    if(data.showDetails){
      data.showDetails = false;
      data.icon = 'ios-add';
    }else{
      data.showDetails = true;
      data.icon = 'ios-remove';
    }

  }

  getVisitors(){
    this.authService.postData(this.userPostData, 'getVisits').then((result)=>{
      this.responseData = result;
      this.visitorSet = this.responseData.feedData;
      this.keys = Object.keys(this.visitorSet);
      this.len.emit = this.keys.length;
      console.log("length", this.len.emit);
    })
  }

}
