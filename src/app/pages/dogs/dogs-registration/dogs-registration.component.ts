import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { DogsRegistrationFormBuilder } from './dogs-registraion-form.builder';

@Component({
  selector: 'dogs-app-dogs-registration',
  templateUrl: './dogs-registration.component.html',
  styleUrls: ['./dogs-registration.component.scss'],
  providers: [DogsRegistrationFormBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsRegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  maxBirthDate!: string;
  formSubmitted: boolean = false;

  constructor(
    private readonly dogsRegistrationFormBuilder: DogsRegistrationFormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.maxBirthDate = moment().startOf('day').toISOString();
    this.registrationForm = this.dogsRegistrationFormBuilder.createForm();
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.formSubmitted = true;
  }

  navigateBack(): void {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }

  getControlErrors(controlName: string): ValidationErrors | null {
    const control = this.registrationForm.get(controlName);
    if (control) {
      return control.errors;
    }
    return null;
  }
}
