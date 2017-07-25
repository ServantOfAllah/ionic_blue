import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncePage } from './announce';

@NgModule({
  declarations: [
    AnnouncePage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncePage),
  ],
  exports: [
    AnnouncePage
  ]
})
export class AnnouncePageModule {}
