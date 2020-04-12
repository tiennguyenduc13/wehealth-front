import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: StorePage,
    children: [
      {
        path: 'inbox',
        redirectTo: '/store/tabs',
        pathMatch: 'full',
      },
      {
        path: 'outbox',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../store/outbox/outbox.module').then(
                (m) => m.OutboxPageModule
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
              import('./inbox/inbox.module').then((m) => m.InboxPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/store/tabs/inbox',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/store/tabs/inbox',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
