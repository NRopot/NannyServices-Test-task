import { User } from '@app/declarations/interfaces/user.interface';

export interface CreationDialogData {
  user: User | null;
  isReadonly: boolean;
}
