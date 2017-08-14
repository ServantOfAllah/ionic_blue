import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidatorsProvider {

  constructor(private toastCtrl: ToastController, private network: Network, public http: Http) {
    console.log('Hello ValidatorsProvider Provider');
  }

  validateFields(): boolean{
    return true;
  }

   displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    let toast = this.toastCtrl.create({
      message: `you are now ${connectionState} via ${networkType}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  onlineNetworkStatus(){
    this.network.onConnect().subscribe(data=>{
      console.log(data);
      //this.displayNetworkUpdate(data.type);
    }, error => console.log(error));
  }

  offlineNetworkStatus(){
    this.network.onDisconnect().subscribe(data=>{
      console.log(data);
      //this.displayNetworkUpdate(data.type);
    }, error => console.log(error));
  }

}
