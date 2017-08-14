import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ValidatorsProvider } from '../../providers/validators/validators';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseServiceProvider {

  constructor(private toastCtrl: ToastController, private validators: ValidatorsProvider, public http: Http, private afd: AngularFireDatabase) {
    console.log('Hello AngularServiceProvider Provider');
  }

  getAnnouncement(){
    return this.afd.list('/announcement/',{
      query: {
        orderByChild: 'titleValue',
      }
    });
  }

  addAnnouncement(title, body){
    if(this.validators.onlineNetworkStatus()){
      this.afd.list('/announcement/').push([title, body]);
    }else{
      let toast = this.toastCtrl.create({
        message: 'No internet connection',
        duration: 3000,
        position: 'bottom'
      });
        toast.present();
        return false;
    }
  }

  removeAnnouncement(id){
    this.afd.list('/announcement/').remove(id);
  }

}
