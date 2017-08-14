import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorsList } from './visitors-list';

@NgModule({
  declarations: [
    VisitorsList,
  ],
  imports: [
    IonicPageModule.forChild(VisitorsList),
  ],
  exports: [
    VisitorsList
  ]
})
export class VisitorsListModule {}
