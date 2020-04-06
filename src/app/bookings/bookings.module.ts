import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { BookingsPage } from "./bookings.page";

const routes: Routes = [
  {
    path: "",
    component: BookingsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BookingsPage],
})
export class BookingsPageModule {}
