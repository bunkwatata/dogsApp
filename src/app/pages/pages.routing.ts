import { Route } from '@angular/router';

import { PagesComponent } from './pages.component';

export const PAGES_ROUTING_COMPONENTS = [PagesComponent];
export const pagesRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dogs' },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dogs',
        loadChildren: (): any =>
          import('@pages/dogs/dogs.module').then((m) => m.DogsModule),
      },
    ],
  },
  { path: '**', redirectTo: 'dogs' },
];
