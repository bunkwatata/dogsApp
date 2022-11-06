import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dogs-app-auth-card',
  templateUrl: './auth-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCardComponent {
  @Input() title!: string;
}
