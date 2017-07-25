import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TwitterService } from 'ng2-twitter';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitterProvider {

  token = 	'830809550-2nEEaEvzAqipHtP1s3WBBHO0bzDxTrXZymMgwmA3';
  tokenSecret = 'RR7HcqBwvuGQrtQV5HFIpGlpLEvMQwZuMuanVPTDx44L3';
  consumerKey = '1vIv7ok0MO2sfmzZY5bzFcUtw';
  consumerSecret = 'BXVzPcEfABA9wErjL2kNmWH3hVIPSzKd1vHEADqFunQWwOzyzc';

  params = {
    q: 'blue',
    count: 10
  }

  constructor(public http: Http, private twitter: TwitterService) {

  }

  setTokens(token, tokenSecret) {
    this.token = token;
    this.tokenSecret = tokenSecret;
  }

  getTweets(){
    return this.twitter.get('https://api.twitter.com/1.1/search/tweets.json', this.params,
    { consumerKey: this.consumerKey, consumerSecret: this.consumerSecret },
    { token: this.token, tokenSecret: this.tokenSecret}
    ).map(res => res.json());
  }

  

}
