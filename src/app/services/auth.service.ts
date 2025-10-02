import { computed, inject, Injectable, Signal } from '@angular/core';
import { UsersStore } from '@app/stores/users.store';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { Router } from '@angular/router';
import { User } from '@app/declarations/interfaces/user.interface';
import { isNil } from '@app/functions/is-nil.function';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly usersStore = inject(UsersStore);
  private readonly currentUserStore = inject(CurrentUserStore);

  private readonly adminUsers: Signal<User[]> = computed(() =>
    this.usersStore.users().filter((user: User) => user.role === UserRoles.Admin)
  );
  constructor(private readonly router: Router) {}

  public login(username: string, password: string): void {
    const user: User = this.usersStore.getUserByCredentials(username, password);
    const isUserAdmin: boolean = this.adminUsers().some(
      (admin: User) => admin.username === username && admin.password === password
    );

    if (!isNil(user)) {
      this.currentUserStore.updateCurrentUser({
        userId: user.id,
        username,
        isAuthorized: true,
        role: isUserAdmin ? UserRoles.Admin : UserRoles.Customer,
      });
      this.router.navigate(['/customers']);
    }
  }

  public logout(): void {
    this.currentUserStore.updateCurrentUser({
      userId: null,
      username: '',
      isAuthorized: false,
      role: null,
    });
    this.router.navigate(['/sign-in']);
  }
}
