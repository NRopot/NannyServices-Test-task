import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withLocalStorage } from '@app/store-features/with-local-storage.feature';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';

type CurrentUserState = {
  isAuthorized: boolean;
  userId: string | null;
  username: string;
  role: UserRoles | null;
};

const initialState: CurrentUserState = {
  isAuthorized: false,
  userId: null,
  username: '',
  role: null,
};
const LOCAL_STORAGE_KEY: string = 'CURRENT_USER_STATE';

export const CurrentUserStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withLocalStorage<CurrentUserState>(LOCAL_STORAGE_KEY),
  withMethods((store) => ({
    updateCurrentUser(currentUser: CurrentUserState): void {
      patchState(store, () => ({ ...currentUser }));
    },
  }))
);
