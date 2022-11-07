import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'auth' },
      {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: (): any =>
          import('@auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'pages',
        canActivate: [AuthGuard],
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
