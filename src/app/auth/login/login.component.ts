import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'dogs-app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  signInFormError: boolean = false;
  signInForm: FormGroup = new FormGroup({});

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['../forgot-password'], {
      relativeTo: this.activatedRoute,
    });
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInFormError = true;
      return;
    }
    this.signInFormError = false;

    if (this.authService.login(this.signInForm.value)) {
      this.router.navigate(['/dogs']);
      return;
    }
    this.signInFormError = true;
  }

  private createLoginForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
