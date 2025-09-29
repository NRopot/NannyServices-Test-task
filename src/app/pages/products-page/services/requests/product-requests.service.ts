import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import PRODUCTS from '@app/mocked-data/products.json';
import { Product } from '@app/declarations/interfaces/product.interface';

@Injectable()
export class ProductRequestsService {
  public get(): Observable<Product[]> {
    return of(PRODUCTS);
  }
}
