import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NavigationService } from '../../services/navigation.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  providers: [NavigationService],
  imports: [RouterLink, MatButton, CommonModule],
})
export class HeaderComponent {
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

  constructor(private readonly navigationService: NavigationService) {}
}
