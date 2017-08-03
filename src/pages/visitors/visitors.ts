import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-visitors',
  templateUrl: 'visitors.html',
})
export class Visitors {

  employees: string;
  purpose: string;
  v_name: string;
  v_company: string;
  v_comment: string;
  userDetails: any;
  responseData: any;

  person_visiting = ["Ali", "Arshad", "Roma", "Abdul"];
  visit_purpose = ["Social","Business","Casual"];

  constructor(private toastCtrl: ToastController, private loadCtrl: LoadingController, private authService: AuthServiceProvider, private view:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Visitors');
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
      vis_user: this.employees, 
      vis_name: this.v_name,
      vis_company: this.v_company, 
      vis_purpose: this.purpose, 
      vis_comments: this.v_comment,
      vis_date:""
    }
    console.log('from visitors page:', vData);

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

  closeModal(){
    this.view.dismiss();
  }

}
