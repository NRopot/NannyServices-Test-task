import { Column } from '@app/declarations/interfaces/column.interface';

export interface TableConfig<T extends object = object> {
  dataSource: T[];
  columns: Column<T>[];
}
