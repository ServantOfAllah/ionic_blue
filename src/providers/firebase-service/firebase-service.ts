import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public http: Http, private afd: AngularFireDatabase) {
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
    this.afd.list('/announcement/').push([title, body]);
  }

  removeAnnouncement(id){
    this.afd.list('/announcement/').remove(id);
  }

}
