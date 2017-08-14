import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-visitors-list',
  templateUrl: 'visitors-list.html',
})
export class VisitorsList {

  public userDetails: any;
  public responseData: any;
  userPostData: any;
  visitorSet: any;
  icon: string;

  constructor(private authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData = {
      "user_id": this.userDetails.user_id, 
      "token": this.userDetails.token
    }
    this.getVisitors();
    this.icon = 'ios-more';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorsList');
  }

  togggleDetails(data){
    data.icon = 'ios-more';
    if(data.showDetails){
      data.showDetails = false;
      data.icon = 'ios-more';
    }else{
      data.showDetails = true;
      data.icon = 'ios-more';
    }
  }

  getVisitors(){
    this.authService.postData(this.userPostData, 'getVisits').then((result)=>{
      this.responseData = result;
      console.log("response", this.responseData);
      this.visitorSet = this.responseData.feedData;
      console.log("response", this.visitorSet);
    })
  }

}
