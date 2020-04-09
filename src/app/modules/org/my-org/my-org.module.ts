import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyOrgPage } from './my-org.page';
import { OrgItemComponent } from './org-item/org-item.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrgPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [MyOrgPage, OrgItemComponent],
})
export class MyOrgPageModule {}
