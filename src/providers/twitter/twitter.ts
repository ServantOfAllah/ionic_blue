import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TwitterService } from 'ng2-twitter';
import 'rxjs/add/operator/map';

let baseUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
//let headers = new Headers();

@Injectable()
export class TwitterProvider {

  token = 	'830809550-x3rVbj5YbRqoQh3Z68QcOwQo44gXQfrXpO7pi9W3';
  tokenSecret = 'l8gCgotDu9LL44zrGFnGVH9nXP6GAUdt5nbYOKJXfy0ja';
  consumerKey = 'PzSbUBsdo0zR75MkAQoutHQ4V';
  consumerSecret = '5PhM8UuP88lS3pxnYrvFaMG5sA6yVBf6tmRmGl7dSd8i8hedFF';

  params = {
    screen_name: 'blue_llc',
    count: 15,
  }
  oAuthKey = { 
    consumerKey: this.consumerKey, 
    consumerSecret: this.consumerSecret 
  }
  oAuthToken = {
    token: this.token, 
    tokenSecret: this.tokenSecret
  }

  constructor(public http: Http, private twitter: TwitterService) {
    console.log(this.getTweets());
  }

  setTokens(token, tokenSecret) {
    this.token = token;
    this.tokenSecret = tokenSecret;
  }

  getTweets(){
    return this.twitter.get(baseUrl, this.params, this.oAuthKey, this.oAuthToken).map(res => res.json());
  };

  

}
