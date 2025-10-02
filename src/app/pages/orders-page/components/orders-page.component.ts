import { ChangeDetectionStrategy, Component, computed, inject, Signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Order } from '@app/declarations/interfaces/order.interface';
import { TableComponent } from '@app/components/table/table.component';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { PaginationServiceService } from '@app/services/pagination.service';
import { MatMiniFabButton } from '@angular/material/button';
import { OrdersStore } from '@app/stores/orders.store';
import { OrderStatuses } from '@app/declarations/enums/order-statuses.enum';
import { CurrentUserStore } from '@app/stores/current-user.store';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';
import { HasAccessDirective } from '@app/directives/has-access.directive';

const DISPLAYED_COLUMNS: Column<Order>[] = [
  {
    id: 'productName',
    label: 'Product',
    width: '31rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'count',
    label: 'Count',
    width: '31rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'status',
    label: 'Status',
    width: '31rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'price',
    label: 'Price',
    type: ColumnTypes.Price,
  },
];

const ADMIN_DISPLAYED_COLUMNS: Column<Order>[] = [
  {
    id: 'userName',
    label: 'Customer',
    width: '31rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'count',
    label: 'Count',
    width: '31rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'createdDate',
    label: 'Created date',
    width: '31rem',
    type: ColumnTypes.Date,
  },
  {
    id: 'modifiedDate',
    label: 'Modified date',
    width: '31rem',
    type: ColumnTypes.Date,
  },
  {
    id: 'status',
    label: 'Status',
    width: '31rem',
    type: ColumnTypes.Status,
  },
  {
    id: 'price',
    label: 'Price',
    type: ColumnTypes.Price,
  },
];

@Component({
  selector: 'app-products-page',
  templateUrl: 'orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationServiceService],
  imports: [
    HasAccessDirective,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    TableComponent,
    MatMiniFabButton,
  ],
})
export class OrdersPageComponent {
  private readonly ordersStore = inject(OrdersStore);
  private readonly currentUserStore = inject(CurrentUserStore);

  public readonly orderStatuses: typeof OrderStatuses = OrderStatuses;
  public readonly userRoles: typeof UserRoles = UserRoles;

  private readonly ordersByUserId: Signal<Order[]> = computed(() =>
    this.ordersStore.orders().filter((order: Order) => order.userId === this.currentUserStore.userId())
  );

  public readonly tableConfig: Signal<TableConfig<Order>> = computed(() => ({
    dataSource: this.paginationServiceService.getItemsWithPagination(this.ordersByUserId()),
    columns: DISPLAYED_COLUMNS,
    totalCount: this.ordersByUserId().length,
  }));

  public readonly adminTableConfig: Signal<TableConfig<Order>> = computed(() => ({
    dataSource: this.paginationServiceService.getItemsWithPagination(this.ordersStore.orders()),
    columns: ADMIN_DISPLAYED_COLUMNS,
    totalCount: this.ordersStore.ordersCount(),
    orderStatusChangedCallback: this.updateOrderStatus.bind(this),
  }));

  constructor(private readonly paginationServiceService: PaginationServiceService) {}

  public updateOrderStatus(status: OrderStatuses, orderId: string): void {
    this.ordersStore.updateOrderStatus(status, orderId);
  }

  public deleteOrder(orderId: string): void {
    this.ordersStore.removeOrder(orderId);
  }
}
