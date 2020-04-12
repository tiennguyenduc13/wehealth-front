import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MailboxPage } from './mailbox.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MailboxPage,
    children: [
      {
        path: 'inbox',
        redirectTo: '/mailbox/tabs',
        pathMatch: 'full',
      },
      {
        path: 'outbox',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mailbox/outbox/outbox.module').then(
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
        redirectTo: '/mailbox/tabs/inbox',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/mailbox/tabs/inbox',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailboxRoutingModule {}
