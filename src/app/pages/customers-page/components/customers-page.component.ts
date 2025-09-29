import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '@app/declarations/interfaces/customer.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomersRequestsService } from '@app/pages/customers-page/services/requests/customers-requests.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/components/button/button.component';
import { TableComponent } from '@app/components/table/table.component';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';

const DISPLAYED_COLUMNS: Column<Customer>[] = [
  {
    id: 'firstName',
    label: 'First name',
    width: '10rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'lastName',
    label: 'Last name',
    width: '10rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'address',
    label: 'Address',
    width: '20rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'photoUrl',
    label: 'Photo',
    type: ColumnTypes.Photo,
  },
];

@Component({
  selector: 'app-customers-page',
  templateUrl: 'customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomersRequestsService],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMiniFabButton,
    MatPaginatorModule,
    ButtonComponent,
    TableComponent,
  ],
})
export class CustomersPageComponent {
  public readonly tableConfig$: Observable<TableConfig<Customer>> = this.customersRequestsService.get().pipe(
    map((dataSource: Customer[]) => ({
      dataSource,
      columns: DISPLAYED_COLUMNS,
    }))
  );
  constructor(private readonly customersRequestsService: CustomersRequestsService) {}
}
