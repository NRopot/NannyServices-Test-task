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

  public readonly tableConfig: Signal<TableConfig<Product>> = computed(() => ({
    dataSource: this.paginationServiceService.getItemsWithPagination(this.productsStore.products()),
    columns: DISPLAYED_COLUMNS,
    totalCount: this.productsStore.products().length,
  }));

  constructor(private readonly paginationServiceService: PaginationServiceService) {}
}
