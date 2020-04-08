import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HealthChangePage } from './health-change.page';
import { HealthChangeItemComponent } from './health-change-item/health-change-item.component';

const routes: Routes = [
  {
    path: '',
    component: HealthChangePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HealthChangePage, HealthChangeItemComponent],
})
export class HealthChangePageModule {}
