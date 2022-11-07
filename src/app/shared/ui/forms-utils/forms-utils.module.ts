import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormErrorComponent } from './form-error/form-error.component';

const EXPORT_COMPONENTS = [FormErrorComponent];

@NgModule({
  declarations: [...EXPORT_COMPONENTS],
  exports: [...EXPORT_COMPONENTS],
  imports: [CommonModule],
})
export class FormsUtilsModule {}
