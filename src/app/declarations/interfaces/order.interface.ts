import { OrderStatuses } from '@app/declarations/enums/order-statuses.enum';

export interface Order {
  readonly id: string;
  readonly userId: string;
  readonly userName: string;
  readonly productId: string;
  readonly productName: string;
  readonly count: number;
  readonly price: number;
  readonly status: OrderStatuses;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
}
