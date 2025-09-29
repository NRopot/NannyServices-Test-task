import { ColumnTypes } from '@app/declarations/enums/column-types.enum';

export interface Column<T extends object = object> {
  id: (keyof Partial<T> & string) | 'actions';
  label: string;
  width?: string;
  type: ColumnTypes;
}
