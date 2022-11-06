import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'auth' },
      {
        path: 'auth',
        loadChildren: (): any =>
          import('@auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'pages',
        loadChildren: (): any =>
          import('@pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
