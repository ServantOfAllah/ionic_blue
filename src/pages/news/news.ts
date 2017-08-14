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
  userTweets: any;
  loading: Loading;
  createdAt: any;
  postUrls: any;
  text: any;
  icon: string;
  showDetails: boolean=false;

  constructor(private loadCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, 
              private twitterProvider: TwitterProvider, private loadingCtrl: LoadingController, 
              private toastCtrl: ToastController, private iab: InAppBrowser) {

    this.icon = 'ios-add-circle-outline';
    //setInterval(this.getUserTweets(), 60000);
  }

  ionViewDidLoad() {
    this.presentLoading();
    console.log('ionViewDidLoad NewsPage');
  }
  ionViewWillEnter() {
    this.getUserTweets();
  }

  presentLoading(){
    let loader = this.loadCtrl.create({
      spinner:'bubbles',
      content: 'Please wait',
      duration: 2500
    });
    loader.present();
  }

  // deRefresher(refresher){
  //   this.getUserTweets();
  //   setTimeout(() => {
  //     console.log('update has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  togggleDetails(data){
    if(data.showDetails){
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    }else{
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  public getUserTweets(){
    this.tweets = this.twitterProvider.getTweets();
    this.tweets.subscribe(data => {
      this.userTweets = data;
      this.createdAt = this.userTweets.created_at;
      this.postUrls = this.userTweets.entities.urls[1].expanded_url;
      this.text = this.userTweets.text;
      console.log('my data:', data);
    },err =>{
      console.log('cannot get tweets');
    })

  }

  openLink(u){
    const browser = this.iab.create(u, '_blank');
  }

}
