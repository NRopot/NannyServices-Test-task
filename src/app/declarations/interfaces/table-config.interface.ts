import { Column } from '@app/declarations/interfaces/column.interface';
import { OrderStatuses } from '@app/declarations/enums/order-statuses.enum';

export interface TableConfig<T extends object = object> {
  dataSource: T[];
  columns: Column<T>[];
  totalCount: number;
  orderStatusChangedCallback?: (status: OrderStatuses, orderId: string) => void;
}
