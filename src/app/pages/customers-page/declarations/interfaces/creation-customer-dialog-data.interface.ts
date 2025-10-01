import { User } from '@app/declarations/interfaces/user.interface';

export interface CreationCustomerDialogData {
  user: User | null;
  isReadonly: boolean;
}
