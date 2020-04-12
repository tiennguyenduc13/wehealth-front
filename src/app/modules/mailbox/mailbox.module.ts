import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MailboxPage } from './mailbox.page';
import { MailboxRoutingModule } from './mailbox-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, MailboxRoutingModule],
  declarations: [MailboxPage],
})
export class MailboxPageModule {}
