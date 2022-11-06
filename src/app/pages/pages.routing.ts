import { Route } from '@angular/router';

import { PagesComponent } from './pages.component';

export const PAGES_ROUTING_COMPONENTS = [PagesComponent];
export const pagesRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dogs' },
  {
    path: '',
    component: PagesComponent,
  },
  { path: '**', redirectTo: 'dogs' },
];
