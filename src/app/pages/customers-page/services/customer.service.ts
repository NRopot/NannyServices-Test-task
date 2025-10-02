import { inject, Injectable } from '@angular/core';
import { CreationCustomerDialogData } from '@app/pages/customers-page/declarations/interfaces/creation-customer-dialog-data.interface';
import { isNil } from '@app/functions/is-nil.function';
import { User } from '@app/declarations/interfaces/user.interface';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CustomerCreationDialogComponent } from '@app/pages/customers-page/components/customer-creation-dialog/customer-creation-dialog.component';
import { UsersStore } from '@app/stores/users.store';

@Injectable()
export class CustomerServiceService {
  private readonly usersStore = inject(UsersStore);

  private readonly dialog: Dialog = inject(Dialog);

  constructor() {}

  public openDialog(id?: string, isReadonly: boolean = false): void {
    const data: CreationCustomerDialogData = {
      user: isNil(id) ? null : (this.usersStore.customers().find((customer: User) => customer.id === id) ?? null),
      isReadonly,
    };
    const dialogRef: DialogRef<User | null> = this.dialog.open<User | null>(CustomerCreationDialogComponent, {
      width: '30rem',
      data,
    });

    dialogRef.closed.subscribe((customer: User | null) => {
      if (isNil(customer)) {
        return;
      }

      if (isNil(id)) {
        this.usersStore.addUser(customer);
        return;
      }

      this.usersStore.updateUser(customer);
    });
  }
}
