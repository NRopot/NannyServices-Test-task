import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { inject } from '@angular/core';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';

export const isAuthorizedGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  const currentUserStore = inject(CurrentUserStore);
  const router: Router = inject(Router);

  const page: string = route.url[0].path;

  if (currentUserStore.isAuthorized()) {
    if (page === 'customers' && ![UserRoles.Admin].includes(currentUserStore.role())) {
      router.navigate(['/products']);

      return false;
    }

    return true;
  }

  router.navigate(['/sign-in']);

  return false;
};
