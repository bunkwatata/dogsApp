import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from '@core/services/auth-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'dogs-app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  loggedName!: string | undefined;

  get appName(): string {
    return environment.appName;
  }

  constructor(
    private readonly authStorageService: AuthStorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loggedName = this.authStorageService.getSession()?.email;
  }

  onLogout(): void {
    this.authStorageService.removeSessionData();
    this.router.navigate(['auth']);
  }
}
