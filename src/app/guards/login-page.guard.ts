import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { inject } from '@angular/core';

export const loginPageGuard: CanActivateFn = (): boolean => {
  const currentUserStore = inject(CurrentUserStore);
  const router: Router = inject(Router);

  if (!currentUserStore.isAuthorized()) {
    return true;
  }

  router.navigate(['/customers']);

  return false;
};
