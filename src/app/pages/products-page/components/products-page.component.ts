import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  providers: [ProductRequestsService],
  imports: [CommonModule, MatIconModule, MatMiniFabButton, ButtonComponent, TableComponent],
})
export class ProductsPageComponent {
  public readonly tableConfig$: Observable<TableConfig<Product>> = this.productRequestsService.get().pipe(
    map((dataSource: Product[]) => ({
      dataSource,
      columns: DISPLAYED_COLUMNS,
    }))
  );

  constructor(private readonly productRequestsService: ProductRequestsService) {}
}
