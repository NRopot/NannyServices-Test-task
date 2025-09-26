import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-products-page',
  templateUrl: 'orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent {
  constructor() {}
}
