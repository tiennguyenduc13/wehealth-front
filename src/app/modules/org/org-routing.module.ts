import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrgPage } from './org.page';

const routes: Routes = [
  //   {
  //     path: 'tabs',
  //     component: OrgPage,
  //     children: [
  //       {
  //         path: 'discover',
  //         children: [
  //           {
  //             path: '',
  //             loadChildren: () =>
  //               import('./discover/discover.module').then(
  //                 (m) => m.DiscoverPageModule
  //               ),
  //           },
  //         ],
  //       },
  //       {
  //         path: 'health-change',
  //         children: [
  //           {
  //             path: '',
  //             loadChildren: () =>
  //               import('./health-change/health-change.module').then(
  //                 (m) => m.HealthChangePageModule
  //               ),
  //           },
  //           {
  //             path: 'new',
  //             loadChildren: () =>
  //               import(
  //                 './health-change/new-health-change/new-health-change.module'
  //               ).then((m) => m.NewHealthChangePageModule),
  //           },
  //         ],
  //       },
  //       {
  //         path: '',
  //         redirectTo: '/places/tabs/discover',
  //         pathMatch: 'full',
  //       },
  //     ],
  //   },
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgRoutingModule {}
