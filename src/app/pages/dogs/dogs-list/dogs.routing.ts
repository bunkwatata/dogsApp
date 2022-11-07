import { Route } from '@angular/router';

import { DogsRegistrationComponent } from '../dogs-registration/dogs-registration.component';
import { DogsListComponent } from './dogs-list.component';

export const DOGS_ROUTING_COMPONENTS = [
  DogsListComponent,
  DogsRegistrationComponent,
];

export const dogsRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: 'list',
    component: DogsListComponent,
  },
  {
    path: 'register',
    component: DogsRegistrationComponent,
  },
];
