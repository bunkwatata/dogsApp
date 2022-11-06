import { Injectable } from '@angular/core';
import { Session } from '@shared/models/session.model';
import { UserCredentials } from '@shared/models/user-credentials.model';

const SESSION_STORAGE_KEY = 'session';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  storeSessionData(user: UserCredentials): void {
    localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        email: user.email,
        date: new Date().toISOString(),
      } as Session)
    );
  }

  removeSessionData(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  getSession(): Session | null {
    const sessionString = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!sessionString || !sessionString.length) {
      return null;
    }

    return JSON.parse(sessionString) as Session;
  }

  isLoggedIn(): boolean {
    return Boolean(this.getSession());
  }
}
