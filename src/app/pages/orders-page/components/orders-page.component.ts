import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { OrderLinesRequestsService } from '@app/pages/orders-page/services/requests/order-lines-requests.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { OrderLine } from '@app/declarations/interfaces/order-line.interface';
import { TableComponent } from '@app/components/table/table.component';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { PaginationServiceService } from '@app/services/pagination.service';

const DISPLAYED_COLUMNS: Column<OrderLine>[] = [
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
  providers: [OrderLinesRequestsService, PaginationServiceService],
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule, TableComponent],
})
export class OrdersPageComponent {
  public readonly tableConfig$: Observable<TableConfig<OrderLine>> = this.orderLinesRequestsService.get().pipe(
    map((dataSource: OrderLine[]) => ({
      dataSource,
      columns: DISPLAYED_COLUMNS,
      totalCount: dataSource.length,
    }))
  );

  constructor(private readonly orderLinesRequestsService: OrderLinesRequestsService) {}
}
