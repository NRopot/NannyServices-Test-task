import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/pages/not-found-page/components/not-found-page.component';

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
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products-page/components/products-page.component').then((c) => c.ProductsPageComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders-page/components/orders-page.component').then((c) => c.OrdersPageComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/login-page/components/login-page.component').then((c) => c.LoginPageComponent),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
