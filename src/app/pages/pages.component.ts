import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from '@core/services/auth-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'dogs-app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  get appName(): string {
    return environment.appName;
  }

  constructor(
    private readonly authStorageService: AuthStorageService,
    private readonly router: Router
  ) {}

  onLogout(): void {
    this.authStorageService.removeSessionData();
    this.router.navigate(['auth']);
  }
}
