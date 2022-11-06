import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PAGES_ROUTING_COMPONENTS, pagesRoutes } from './pages.routing';

@NgModule({
  declarations: [...PAGES_ROUTING_COMPONENTS],
  imports: [CommonModule, RouterModule.forChild(pagesRoutes)],
})
export class PagesModule {}
