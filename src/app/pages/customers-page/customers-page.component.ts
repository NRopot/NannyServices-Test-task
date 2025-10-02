import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/components/button/button.component';
import { TableComponent } from '@app/components/table/table.component';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';
import { UsersStore } from '@app/stores/users.store';
import { User } from '@app/declarations/interfaces/user.interface';
import { DialogModule } from '@angular/cdk/dialog';
import { PaginationServiceService } from '@app/services/pagination.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionsBottomSheetComponent } from '@app/pages/customers-page/components/actions-bottom-sheet/actions-bottom-sheet.component';
import { CustomerServiceService } from '@app/pages/customers-page/services/customer.service';

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
  providers: [PaginationServiceService, CustomerServiceService],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    ButtonComponent,
    TableComponent,
    DialogModule,
    MatIconButton,
  ],
})
export class CustomersPageComponent {
  private readonly usersStore = inject(UsersStore);
  private readonly bottomSheet: MatBottomSheet = inject(MatBottomSheet);

  public readonly tableConfig: Signal<TableConfig<User>> = computed(() => ({
    dataSource: this.paginationServiceService.getItemsWithPagination(this.usersStore.customers()),
    columns: DISPLAYED_COLUMNS,
    totalCount: this.usersStore.customers().length,
  }));

  constructor(
    private readonly paginationServiceService: PaginationServiceService,
    private readonly customerServiceService: CustomerServiceService,
    private readonly injector: Injector
  ) {}

  openBottomSheet(user: User): void {
    this.bottomSheet.open(ActionsBottomSheetComponent, {
      data: { user, injector: this.injector },
    });
  }

  public openDialog(): void {
    this.customerServiceService.openDialog();
  }
}
