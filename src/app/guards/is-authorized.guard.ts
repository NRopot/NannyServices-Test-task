import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { inject } from '@angular/core';

export const isAuthorizedGuard: CanActivateFn = (): boolean => {
  const currentUserStore = inject(CurrentUserStore);
  const router: Router = inject(Router);

  if (currentUserStore.isAuthorized()) {
    return true;
  }

  router.navigate(['/sign-in']);

  return false;
};
