import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './modules/auth/login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/login/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/auth/signup/signup.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'places',
    loadChildren: () =>
      import('./modules/places/places.module').then((m) => m.PlacesPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'org',
    loadChildren: () =>
      import('./modules/org/org.module').then((m) => m.OrgPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./modules/setting/setting.module').then(
        (m) => m.SettingPageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
