import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ValidatorsProvider } from '../../providers/validators/validators';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  submitAttemp: boolean = false;

  responseData: any;
  employeesData: any;
  userData = { "username":"", "password":"", "email":"", "name":"", "groups":"" };

  constructor(private validators: ValidatorsProvider, private storage: Storage, private toastCtrl: ToastController, private authService: AuthServiceProvider, private navCtrl: NavController, private navParams: NavParams, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad(){
    if(localStorage.getItem('userData')){
      this.navCtrl.setRoot("TabsPage");
    }
    else{
      //this.displayNetworkUpdate('offline');
      //this.navCtrl.setRoot("LoginPage");
    }

  }

  goToRegister(): void{
    this.navCtrl.push('RegisterPage');
  }

  emptyValidationToast() {
    let toast = this.toastCtrl.create({
      message: 'The username and password field cannot be empty',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  validationToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  goToHome(){
    // this.navCtrl.setRoot('TabsPage');
    //this.getUserData();
    this.submitAttemp = true
      if(this.userData.username && this.userData.password){
        this.authService.postData(this.userData, 'login').then((result)=>{
          this.responseData = result;
          console.log("Response data ",this.responseData);
          if(this.responseData.userData){
            localStorage.setItem('userData', JSON.stringify(this.responseData));
           this.navCtrl.setRoot('TabsPage');
          }else{
            this.validationToast('please provide valid username and password');
          }
          
        }, (err)=>{
          this.validationToast('No internet connection');
        });
      }else if((this.userData.password = "") || (this.userData.username = "")){
        this.emptyValidationToast();
      }else{
        this.validationToast("fields cannot be empty");
      }
 }

//  getUserData(){
//     this.authService.postData(this.userData, 'getUser').then((result)=>{
//       this.employeesData = result;
//       console.log("Employees", this.employeesData);
//       if(this.employeesData.userData){
//         localStorage.setItem('employeesData', JSON.stringify(this.employeesData));
//         console.log("Employees if", this.employeesData);
//       }
//     }, (err)=>{

//     });
//   }

}
