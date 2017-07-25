import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TwitterProvider } from '../../providers/twitter/twitter';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  tweets: Observable<any[]>;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private twitterProvider: TwitterProvider, private loadingCtrl: LoadingController, 
  private toastCtrl: ToastController, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  ionViewWillEnter() {
    //this.loadTimeline();
  }

  // public loadTimeline(refresher?){

  //   //this.showLoading();
  //   this.tweets = this.twitterProvider.getTweets();
  //   this.tweets.subscribe(data => {
  //     console.log('my data:', data);
  //     this.loading.dismiss();
  //     refresher.complete();
  //   },err =>{
  //     refresher.complete();
  //     //this.showError(err);
  //   })

  // }

}
