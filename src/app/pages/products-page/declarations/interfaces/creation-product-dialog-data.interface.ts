import { Product } from '@app/declarations/interfaces/product.interface';

export interface CreationProductDialogData {
  product: Product | null;
  isReadonly: boolean;
}
