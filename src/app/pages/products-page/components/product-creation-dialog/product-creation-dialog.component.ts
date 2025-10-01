import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { isNil } from '@app/functions/is-nil.function';
import { RawControlValue } from '@app/declarations/types/raw-control-value.type';
import { v4 } from 'uuid';
import { ProductForm } from '@app/declarations/interfaces/product-form.interface';
import { CreationProductDialogData } from '@app/pages/products-page/declarations/interfaces/creation-product-dialog-data.interface';
import { Product } from '@app/declarations/interfaces/product.interface';

@Component({
  selector: 'app-customer-creation-dialog',
  templateUrl: 'product-creation-dialog.component.html',
  styleUrls: ['./product-creation-dialog.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormFieldModule,
    MatIconButton,
    MatInputModule,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatIcon,
  ],
})
export class ProductCreationDialogComponent {
  public readonly dialogRef: DialogRef<Product | null> = this.dialog;

  public readonly isReadonly: boolean = this.data.isReadonly;

  public readonly controls: ProductForm = {
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price: new FormControl(0, [Validators.required]),
  };

  public readonly formGroup: FormGroup<ProductForm> = new FormGroup(this.controls);

  public readonly title: string = isNil(this.data.product?.id)
    ? 'Create product'
    : this.isReadonly
      ? 'View product'
      : 'Edit product';

  constructor(
    @Inject(DIALOG_DATA) private readonly data: CreationProductDialogData,
    @Inject(DialogRef<Product | null>) private readonly dialog: DialogRef<Product | null>
  ) {
    this.toggleForm(this.data.isReadonly);
    this.patchForm();
  }

  private patchForm(): void {
    if (isNil(this.data.product)) {
      return;
    }

    this.formGroup.patchValue(this.data.product);
  }

  private toggleForm(isReadonly: boolean): void {
    if (isReadonly) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  public closeDialog(data?: RawControlValue<FormGroup<ProductForm>> | undefined): void {
    if (isNil(data)) {
      this.dialogRef.close();
      return;
    }

    this.dialogRef.close({
      id: this.data.product?.id ?? v4(),
      ...data,
    });
  }
}
