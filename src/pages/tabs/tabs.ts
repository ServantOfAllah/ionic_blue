import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
