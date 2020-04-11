import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OtherOrgsPage } from './other-orgs.page';
import { OrgItemComponent } from './org-item/org-item.component';

const routes: Routes = [
  {
    path: '',
    component: OtherOrgsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [OtherOrgsPage, OrgItemComponent],
})
export class OtherOrgsPageModule {}
