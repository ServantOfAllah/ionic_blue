import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoot1: string;
  tabRoot2: string;
  tabRoot3: string;

  constructor() {
    this.tabRoot1 = 'ListPage';
    this.tabRoot2 = 'NewsPage';
    this.tabRoot3 = 'AnnouncePage';

  }
}
