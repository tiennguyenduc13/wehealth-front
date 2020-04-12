import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OutboxPage } from './outbox.page';
import { MailItemComponent } from './mail-item/mail-item.component';

const routes: Routes = [
  {
    path: '',
    component: OutboxPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [OutboxPage, MailItemComponent],
})
export class OutboxPageModule {}
