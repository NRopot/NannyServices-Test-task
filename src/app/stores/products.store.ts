import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { of, pipe, switchMap, tap } from 'rxjs';
import { withLocalStorage } from '@app/store-features/with-local-storage.feature';
import { Product } from '@app/declarations/interfaces/product.interface';
import { ProductRequestsService } from '@app/pages/products-page/services/requests/product-requests.service';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
};
const LOCAL_STORAGE_KEY: string = 'PRODUCTS_STATE';

export const ProductsStore = signalStore(
  withState<ProductsState>(initialState),

  withComputed(({ products }) => ({
    productsCount: computed(() => products().length),
  })),

  withLocalStorage<ProductsState>(LOCAL_STORAGE_KEY),

  withMethods(
    ({ products, ...store }, productRequestsService: ProductRequestsService = inject(ProductRequestsService)) => ({
      updateProduct(updatedProduct: Product): void {
        patchState(store, ({ products }: ProductsState) => ({
          products: products.map((stateProduct: Product) =>
            stateProduct.id === updatedProduct.id ? { ...stateProduct, ...updatedProduct } : stateProduct
          ),
        }));
      },
      addProduct(newProduct: Product): void {
        patchState(store, (state) => ({ products: [...state.products, newProduct] }));
      },
      removeProduct(id: string): void {
        patchState(store, (state) => ({
          products: state.products.filter((stateProduct: Product) => stateProduct.id !== id),
        }));
      },
      loadProducts: rxMethod<Product[]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => productRequestsService.get()),
          tapResponse({
            next: (products: Product[]) => patchState(store, { products }),
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        )
      ),
    })
  ),

  withHooks({
    onInit({ loadProducts, products }) {
      if (products().length === 0) {
        loadProducts(of([]));
      }
    },
  })
);
