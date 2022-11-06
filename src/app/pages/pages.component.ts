import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'dogs-app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  get appName(): string {
    return environment.appName;
  }
}
