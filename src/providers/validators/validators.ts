import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidatorsProvider {

  constructor(public http: Http) {
    console.log('Hello ValidatorsProvider Provider');
  }

  validateFields(): boolean{

    return true;
  }

}
