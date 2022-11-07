import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@data-access/data-access.module';

import { DOGS_ROUTING_COMPONENTS, dogsRoutes } from './dogs-list/dogs.routing';

@NgModule({
  declarations: [...DOGS_ROUTING_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(dogsRoutes),
    DataAccessModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class DogsModule {}
