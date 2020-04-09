import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrgPage } from './org.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: OrgPage,
    children: [
      {
        path: 'join',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./my-org/join-org/join-org.module').then(
                (m) => m.JoinOrgPageModule
              ),
          },
        ],
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./my-org/new-org/new-org.module').then(
                (m) => m.NewOrgPageModule
              ),
          },
        ],
      },
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./my-org/my-org.module').then((m) => m.MyOrgPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/org/tabs/my-org',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/org/tabs/my-org',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgRoutingModule {}
