import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { isNil } from '@app/functions/is-nil.function';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-creation-dialog',
  templateUrl: 'product-count-for-order.component.html',
  styleUrls: ['./product-count-for-order.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatButton, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf],
})
export class ProductCountForOrderComponent {
  public readonly dialogRef: DialogRef<number | undefined> = this.dialog;

  public readonly countControl: FormControl<number> = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.min(1)],
  });

  constructor(
    @Inject(DIALOG_DATA) private readonly data: number,
    @Inject(DialogRef<number | undefined>) private readonly dialog: DialogRef<number | undefined>
  ) {
    this.patchForm();
  }

  private patchForm(): void {
    if (isNil(this.data)) {
      return;
    }

    this.countControl.reset(this.data);
  }

  public closeDialog(data?: number | undefined): void {
    if (isNil(data)) {
      this.dialogRef.close();
      return;
    }

    this.dialogRef.close(data);
  }
}
