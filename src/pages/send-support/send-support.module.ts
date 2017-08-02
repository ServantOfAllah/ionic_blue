import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendSupport } from './send-support';

@NgModule({
  declarations: [
    SendSupport,
  ],
  imports: [
    IonicPageModule.forChild(SendSupport),
  ],
  exports: [
    SendSupport
  ]
})
export class SendSupportModule {}
