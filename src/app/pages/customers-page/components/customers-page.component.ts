import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-customers-page',
  templateUrl: 'customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersPageComponent {
  constructor() {
  }
}