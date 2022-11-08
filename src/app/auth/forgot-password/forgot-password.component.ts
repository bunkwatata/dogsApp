import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dogs-app-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordFormError: boolean = false;
  forgotPasswordForm: FormGroup = new FormGroup({});
  formSubmitted: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  navigateToLogin(): void {
    this.router.navigate(['../login'], {
      relativeTo: this.activatedRoute,
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordFormError = true;
      return;
    }

    this.forgotPasswordFormError = false;
    this.formSubmitted = true;
  }

  private createLoginForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
