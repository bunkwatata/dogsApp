import { Injectable } from '@angular/core';
import { UserCredentials } from '@shared/models/user-credentials.model';

import { environment } from '../../../environments/environment';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _authStorageService: AuthStorageService) {}

  login(user: UserCredentials): boolean {
    const credentialsIsValid = environment.allowedLogins.find(
      (login) => login === user?.email
    );

    if (!credentialsIsValid) {
      return false;
    }

    this._authStorageService.storeSessionData(user);
    return true;
  }

  logout(): void {
    this._authStorageService.removeSessionData();
  }
}
