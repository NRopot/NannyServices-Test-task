import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { withLocalStorage } from '@app/store-features/with-local-storage.feature';
import { Order } from '@app/declarations/interfaces/order.interface';
import { OrderStatuses } from '@app/declarations/enums/order-statuses.enum';

type OrdersState = {
  orders: Order[];
  isLoading: boolean;
};

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
};
const LOCAL_STORAGE_KEY: string = 'ORDERS_STATE';

export const OrdersStore = signalStore(
  { providedIn: 'root' },

  withState<OrdersState>(initialState),

  withComputed(({ orders }) => ({
    ordersCount: computed(() => orders().length),
  })),

  withLocalStorage<OrdersState>(LOCAL_STORAGE_KEY),

  withMethods(({ orders, ...store }) => ({
    updateOrderStatus(status: OrderStatuses, orderId: string): void {
      patchState(store, (state: OrdersState) => ({
        orders: state.orders.map((stateOrder: Order) =>
          stateOrder.id === orderId ? { ...stateOrder, status, modifiedDate: new Date() } : stateOrder
        ),
      }));
    },
    addOrder(newOrder: Order): void {
      patchState(store, (state) => ({ orders: [...state.orders, newOrder] }));
    },
    removeOrder(id: string): void {
      patchState(store, (state) => ({ orders: state.orders.filter((stateOrder: Order) => stateOrder.id !== id) }));
    },
  }))
);
