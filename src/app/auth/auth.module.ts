import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthCardComponent } from './auth-card/auth-card.component';
import { AUTH_ROUTING_COMPONENTS, authRoutes } from './auth-routing';

const INNER_COMPONENTS = [AuthCardComponent];

@NgModule({
  declarations: [...AUTH_ROUTING_COMPONENTS, ...INNER_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
