import { ChangeDetectionStrategy, Component, computed, inject, Signal, ViewEncapsulation } from '@angular/core';
import { ProductRequestsService } from '@app/pages/products-page/services/requests/product-requests.service';
import { Product } from '@app/declarations/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@app/components/button/button.component';
import { TableComponent } from '@app/components/table/table.component';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { ProductsStore } from '@app/stores/products.store';
import { PaginationServiceService } from '@app/services/pagination.service';
import { isNil } from '@app/functions/is-nil.function';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CreationProductDialogData } from '@app/pages/products-page/declarations/interfaces/creation-product-dialog-data.interface';
import { ProductCreationDialogComponent } from '@app/pages/products-page/components/product-creation-dialog/product-creation-dialog.component';
import { OrdersStore } from '@app/stores/orders.store';
import { v4 } from 'uuid';
import { OrderStatuses } from '@app/declarations/enums/order-statuses.enum';
import { CurrentUserStore } from '@app/stores/current-user.store';

const DISPLAYED_COLUMNS: Column<Product>[] = [
  {
    id: 'id',
    label: 'ID',
    width: '20rem',
    type: ColumnTypes.Default,
  },
  {
    id: 'name',
    label: 'Name',
    width: '30rem',
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
  templateUrl: 'products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductRequestsService, ProductsStore, PaginationServiceService],
  imports: [CommonModule, MatIconModule, MatMiniFabButton, ButtonComponent, TableComponent],
})
export class ProductsPageComponent {
  private readonly productsStore = inject(ProductsStore);
  private readonly ordersStore = inject(OrdersStore);
  private readonly currentUserStore = inject(CurrentUserStore);

  private readonly dialog: Dialog = inject(Dialog);

  public readonly tableConfig: Signal<TableConfig<Product>> = computed(() => ({
    dataSource: this.paginationServiceService.getItemsWithPagination(this.productsStore.products()),
    columns: DISPLAYED_COLUMNS,
    totalCount: this.productsStore.products().length,
  }));

  constructor(private readonly paginationServiceService: PaginationServiceService) {}

  public createOrder(productId: string): void {
    const createdDate: Date = new Date();
    const product: Product | undefined = this.productsStore
      .products()
      .find((product: Product) => product.id === productId);

    this.ordersStore.addOrder({
      id: v4(),
      userId: this.currentUserStore.userId(),
      userName: this.currentUserStore.username(),
      productId: product?.id ?? null,
      productName: product?.name ?? '',
      count: 1,
      price: product?.price ?? 0,
      createdDate,
      modifiedDate: createdDate,
      status: OrderStatuses.Created,
    });
  }

  public openDialog(id?: string, isReadonly: boolean = false): void {
    const data: CreationProductDialogData = {
      product: isNil(id) ? null : (this.productsStore.products().find((product: Product) => product.id === id) ?? null),
      isReadonly,
    };
    const dialogRef: DialogRef<Product | null> = this.dialog.open<Product | null>(ProductCreationDialogComponent, {
      width: '30rem',
      data,
    });

    dialogRef.closed.subscribe((product: Product | null) => {
      if (isNil(product)) {
        return;
      }

      if (isNil(id)) {
        this.productsStore.addProduct(product);
        return;
      }

      this.productsStore.updateProduct(product);
    });
  }
}
