import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InboxPage } from './inbox.page';
import { MailItemComponent } from './mail-item/mail-item.component';

const routes: Routes = [
  {
    path: '',
    component: InboxPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [InboxPage, MailItemComponent],
})
export class InboxPageModule {}
