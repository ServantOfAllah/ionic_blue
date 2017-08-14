import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-visitors',
  templateUrl: 'visitors.html',
})
export class Visitors {

  employees: any;
  employee_visit:any;
  purpose: string;
  v_name: string;
  v_company: string;
  v_comment: string;
  userDetails: any;
  responseData: any;
  userID: any;

  person_visiting = [];
  visit_purpose = ["Social","Business","Casual"];

  constructor(private toastCtrl: ToastController, private loadCtrl: LoadingController, private authService: AuthServiceProvider, private view:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.getUserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Visitors', this.userDetails);
  }

  visitorList(){
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
        message: 'Visitor was created successfully',
        duration: 2000
      });
      toast1.present();
    })
    setTimeout(() => {
    this.navCtrl.setRoot('TabsPage');
    }, 3000);
  }

  saveVisitor(){
    var vData = {
      vis_office: this.userDetails.user_id,
      vis_dept: this.userDetails.groups,
      vis_user: this.employee_visit,
      vis_name: this.v_name,
      vis_company: this.v_company, 
      vis_purpose: this.purpose, 
      vis_comments: this.v_comment,
      vis_date:""
    }
    console.log('from visitors page:', vData);
    console.log('vis user', vData.vis_user);

    if(vData.vis_user && vData.vis_name && vData.vis_company && vData.vis_purpose && vData.vis_comments){
      //saving the requests to an array / DB
      this.authService.postData(vData, 'visitor').then((result)=>{
          this.responseData = result;
          console.log("Response data", this.responseData); 
        }, (err)=>{

      });
        
      //vData.comments == "";
      this.presentLoading();
    }else{
        let toast = this.toastCtrl.create({
        message: 'Fields cannot be empty',
        duration: 2000
      });
      toast.present();
    }
  }

  getUserData(){
    this.authService.postData(this.userDetails, 'getUser').then((result)=>{
        for(var k in result){
              for(var k2 in result[k]){
                   console.log("crazy loop",[k,k2,result[k]]);
                   console.log("theird_elemnt", result[k]);
                   this.employees = [result[k]];
              }
          }
          this.person_visiting = [this.employees[0]];

    }, (err)=>{

    });
  }

  closeModal(){
    this.view.dismiss();
  }

}
