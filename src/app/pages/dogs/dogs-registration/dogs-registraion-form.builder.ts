import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class DogsRegistrationFormBuilder {
  constructor(private readonly formBuilder: FormBuilder) {}

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      dogRegistrationNumber: ['', Validators.required],
      dogBirthDate: ['', Validators.required],
      description: ['', Validators.nullValidator],
    });
  }
}
