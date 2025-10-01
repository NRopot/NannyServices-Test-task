import { FormControl } from '@angular/forms';

export interface CustomerCreationForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  address: FormControl<string>;
  photoUrl: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}
