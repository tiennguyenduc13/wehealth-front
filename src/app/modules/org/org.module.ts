import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { OrgPage } from './org.page';
import { OrgRoutingModule } from './org-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, OrgRoutingModule],
  declarations: [OrgPage],
})
export class OrgPageModule {}
