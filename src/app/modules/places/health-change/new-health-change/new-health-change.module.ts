import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { NewHealthChangePage } from "./new-health-change.page";

const routes: Routes = [
  {
    path: "",
    component: NewHealthChangePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NewHealthChangePage],
})
export class NewHealthChangePageModule {}
