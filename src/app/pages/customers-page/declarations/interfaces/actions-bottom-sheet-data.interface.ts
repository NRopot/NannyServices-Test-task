import { User } from '@app/declarations/interfaces/user.interface';
import { Injector } from '@angular/core';

export interface ActionsBottomSheetData {
  user: User;
  injector: Injector;
}
