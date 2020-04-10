import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lessons',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../routes/lessons/lessons.module').then(m => m.LessonsPageModule)
          }
        ]
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../routes/discover/discover.module').then(m => m.DiscoverPageModule)
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../routes/mine/mine.module').then(m => m.MinePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/lessons',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lessons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
