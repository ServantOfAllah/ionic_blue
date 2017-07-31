import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Visitors } from './visitors';

@NgModule({
  declarations: [
    Visitors,
  ],
  imports: [
    IonicPageModule.forChild(Visitors),
  ],
  exports: [
    Visitors
  ]
})
export class VisitorsModule {}
