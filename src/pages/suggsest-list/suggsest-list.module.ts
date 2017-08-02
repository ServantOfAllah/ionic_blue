import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggsestList } from './suggsest-list';

@NgModule({
  declarations: [
    SuggsestList,
  ],
  imports: [
    IonicPageModule.forChild(SuggsestList),
  ],
  exports: [
    SuggsestList
  ]
})
export class SuggsestListModule {}
