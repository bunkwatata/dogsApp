import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'dogs-app-form-error',
  templateUrl: './form-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  @Input() errors!: ValidationErrors | null;

  errorsOrder: string[] = [
    'required',
    'email',
    'minlength',
    'maxlength',
    'min',
    'max',
  ];

  getErrorName(): string | undefined {
    return this.errorsOrder.find((error) => this.hasError(error));
  }

  private hasError(name: string): boolean {
    return Boolean(this.errors && this.errors[name]);
  }
}
