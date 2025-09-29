import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRequestsService } from '@app/pages/products-page/services/requests/product-requests.service';
import { Product } from '@app/declarations/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ButtonComponent } from '@app/components/button/button.component';

@Component({
  selector: 'app-products-page',
  templateUrl: 'products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductRequestsService],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMiniFabButton,
    MatPaginatorModule,
    MatButton,
    ButtonComponent,
  ],
})
export class ProductsPageComponent {
  public readonly displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

  public readonly dataSource$: Observable<Product[]> = this.productRequestsService.get();

  constructor(private readonly productRequestsService: ProductRequestsService) {}
}
