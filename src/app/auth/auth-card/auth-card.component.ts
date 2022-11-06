import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'dogs-app-auth-card',
  templateUrl: './auth-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCardComponent {
  @Input() title!: string;

  get appName(): string {
    return environment.appName;
  }
}
