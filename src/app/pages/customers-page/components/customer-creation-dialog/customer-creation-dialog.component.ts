import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@app/declarations/interfaces/user.interface';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { CustomerCreationForm } from '@app/declarations/interfaces/customer-creation-form.interface';
import { CreationDialogData } from '@app/pages/customers-page/declarations/interfaces/creation-dialog-data.interface';
import { isNil } from '@app/functions/is-nil.function';
import { RawControlValue } from '@app/declarations/types/raw-control-value.type';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';
import { v4 } from 'uuid';

@Component({
  selector: 'app-customer-creation-dialog',
  templateUrl: 'customer-creation-dialog.component.html',
  styleUrls: ['./customer-creation-dialog.component.scss'],
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
export class CustomerCreationDialogComponent {
  public readonly dialogRef: DialogRef<User | null> = this.dialog;

  public readonly isReadonly: boolean = this.data.isReadonly;

  public readonly controls: CustomerCreationForm = {
    firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.maxLength(100)]),
    address: new FormControl('', [Validators.maxLength(200)]),
    photoUrl: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  };

  public readonly formGroup: FormGroup<CustomerCreationForm> = new FormGroup(this.controls);

  constructor(
    @Inject(DIALOG_DATA) private readonly data: CreationDialogData,
    @Inject(DialogRef<User | null>) private readonly dialog: DialogRef<User | null>
  ) {
    this.toggleForm(this.data.isReadonly);
    this.patchForm();
  }

  private patchForm(): void {
    if (isNil(this.data.user)) {
      return;
    }

    this.formGroup.patchValue(this.data.user);
  }

  private toggleForm(isReadonly: boolean): void {
    if (isReadonly) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  public closeDialog(data?: RawControlValue<FormGroup<CustomerCreationForm>> | undefined): void {
    if (isNil(data)) {
      this.dialogRef.close();
      return;
    }

    this.dialogRef.close({
      id: this.data.user?.id ?? v4(),
      ...data,
      role: UserRoles.Customer,
    });
  }
}
