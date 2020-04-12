import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HealthPage } from './health.page';
import { HealthRoutingModule } from './health-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, HealthRoutingModule],
  declarations: [HealthPage],
})
export class HealthPageModule {}
