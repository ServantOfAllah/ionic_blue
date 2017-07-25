import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = "http://localhost/PHP-Slim-Restful/api/";
let apiUrl = "http://alserkal-group.com/fujairah/restful/api/";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credemtials, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credemtials), {headers: headers}).subscribe(res =>{
        resolve(res.json());
      }, (err)=>{
        reject(err);
      });
    });
  }

}
