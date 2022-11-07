import { Route } from '@angular/router';

import { DogsListComponent } from './dogs-list.component';

export const DOGS_ROUTING_COMPONENTS = [DogsListComponent];

export const dogsRoutes: Route[] = [
  {
    path: '',
    component: DogsListComponent,
  },
];
