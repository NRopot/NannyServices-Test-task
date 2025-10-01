import { ChangeDetectionStrategy, Component, computed, inject, Signal, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/components/button/button.component';
import { TableComponent } from '@app/components/table/table.component';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';
import { UsersStore } from '@app/stores/users.store';
import { User } from '@app/declarations/interfaces/user.interface';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CustomerCreationDialogComponent } from '@app/pages/customers-page/components/customer-creation-dialog/customer-creation-dialog.component';
import { isNil } from '@app/functions/is-nil.function';
import { CreationCustomerDialogData } from '@app/pages/customers-page/declarations/interfaces/creation-customer-dialog-data.interface';
import { PaginationServiceService } from '@app/services/pagination.service';

const DISPLAYED_COLUMNS: Column<User>[] = [
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
  providers: [PaginationServiceService],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMiniFabButton,
    MatPaginatorModule,
    ButtonComponent,
    TableComponent,
    DialogModule,
  ],
})
export class CustomersPageComponent {
  private readonly usersStore = inject(UsersStore);
  private readonly dialog: Dialog = inject(Dialog);

  public readonly tableConfig: Signal<TableConfig<User>> = computed(() => ({
    dataSource: this.paginationServiceService.getItemsWithPagination(this.usersStore.customers()),
    columns: DISPLAYED_COLUMNS,
    totalCount: this.usersStore.customers().length,
  }));

  constructor(private readonly paginationServiceService: PaginationServiceService) {}

  public openDialog(id?: string, isReadonly: boolean = false): void {
    const data: CreationCustomerDialogData = {
      user: isNil(id) ? null : (this.usersStore.customers().find((customer: User) => customer.id === id) ?? null),
      isReadonly,
    };
    const dialogRef: DialogRef<User | null> = this.dialog.open<User | null>(CustomerCreationDialogComponent, {
      width: '30rem',
      data,
    });

    dialogRef.closed.subscribe((customer: User | null) => {
      if (isNil(customer)) {
        return;
      }

      if (isNil(id)) {
        this.usersStore.addUser(customer);
        return;
      }

      this.usersStore.updateUser(customer);
    });
  }
}
