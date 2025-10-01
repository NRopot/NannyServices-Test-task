import { ChangeDetectionStrategy, Component, inject, Signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NavigationService } from '@app/services/navigation.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { AuthService } from '@app/services/auth.service';

interface Route {
  route: string;
  label: string;
}

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButton, CommonModule, MatIcon],
})
export class HeaderComponent {
  private readonly currentUserStore = inject(CurrentUserStore);

  public readonly isAuthorized: Signal<boolean> = this.currentUserStore.isAuthorized;

  public readonly routes: Route[] = [
    {
      route: 'customers',
      label: 'Customers',
    },
    {
      route: 'products',
      label: 'Products',
    },
    {
      route: 'orders',
      label: 'Orders',
    },
  ];

  public readonly activePage$: Observable<string> = this.navigationService.activePage$;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService
  ) {}

  public logout(): void {
    this.authService.logout();
  }
}
