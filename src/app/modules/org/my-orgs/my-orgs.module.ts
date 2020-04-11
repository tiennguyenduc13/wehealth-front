import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyOrgsPage } from './my-orgs.page';
import { OrgItemComponent } from './org-item/org-item.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrgsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [MyOrgsPage, OrgItemComponent],
})
export class MyOrgsPageModule {}
