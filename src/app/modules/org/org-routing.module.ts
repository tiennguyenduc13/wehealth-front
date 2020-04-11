import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrgPage } from './org.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: OrgPage,
    children: [
      {
        path: 'my-orgs',
        redirectTo: '/org/tabs',
        pathMatch: 'full',
      },
      {
        path: 'other-orgs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./other-orgs/other-orgs.module').then(
                (m) => m.OtherOrgsPageModule
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
              import('./new-org/new-org.module').then(
                (m) => m.NewOrgPageModule
              ),
          },
        ],
      },
      {
        path: 'social/:orgId',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./my-orgs/org-social/org-social.module').then(
                (m) => m.OrgSocialPageModule
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
              import('./my-orgs/my-orgs.module').then(
                (m) => m.MyOrgsPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/org/tabs/my-orgs',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/org/tabs/my-orgs',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgRoutingModule {}
