import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/pages/not-found-page/components/not-found-page.component';
import { isAuthorizedGuard } from '@app/guards/is-authorized.guard';
import { loginPageGuard } from '@app/guards/login-page.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./pages/customers-page/components/customers-page.component').then((c) => c.CustomersPageComponent),
    canActivate: [isAuthorizedGuard],
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products-page/components/products-page.component').then((c) => c.ProductsPageComponent),
    canActivate: [isAuthorizedGuard],
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders-page/components/orders-page.component').then((c) => c.OrdersPageComponent),
    canActivate: [isAuthorizedGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/login-page/components/login-page.component').then((c) => c.LoginPageComponent),
    canActivate: [loginPageGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
