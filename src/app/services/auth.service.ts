import { inject, Injectable } from '@angular/core';
import { UsersStore } from '@app/stores/users.store';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly usersStore = inject(UsersStore);
  private readonly currentUserStore = inject(CurrentUserStore);

  constructor(private readonly router: Router) {}

  public login(username: string, password: string): void {
    const isUserExists: boolean = this.usersStore.checkCredentials(username, password);

    if (isUserExists) {
      this.currentUserStore.updateIsAuthorized(true);
      this.router.navigate(['/customers']);
    }
  }

  public logout(): void {
    this.currentUserStore.updateIsAuthorized(false);
    this.router.navigate(['/sign-in']);
  }
}
