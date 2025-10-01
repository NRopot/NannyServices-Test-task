import { FormControl } from '@angular/forms';

export interface ProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
}
