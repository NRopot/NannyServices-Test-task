import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '@app/declarations/interfaces/customer.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomersRequestsService } from '@app/pages/customers-page/services/requests/customers-requests.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers-page',
  templateUrl: 'customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomersRequestsService],
  imports: [CommonModule, MatTableModule, MatIconModule, MatMiniFabButton, MatPaginatorModule, MatButton],
})
export class CustomersPageComponent {
  public readonly displayedColumns: string[] = ['firstName', 'lastName', 'address', 'photo', 'actions'];

  public readonly dataSource$: Observable<Customer[]> = this.customersRequestsService.get();

  constructor(private readonly customersRequestsService: CustomersRequestsService) {}
}
