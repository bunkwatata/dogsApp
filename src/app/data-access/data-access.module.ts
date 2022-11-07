import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DogsService } from './dogs/dogs.service';

@NgModule({
  providers: [DogsService],
  imports: [CommonModule, HttpClientModule],
})
export class DataAccessModule {}
