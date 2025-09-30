import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withLocalStorage } from '@app/store-features/with-local-storage.feature';

type CurrentUserState = {
  isAuthorized: boolean;
};

const initialState: CurrentUserState = {
  isAuthorized: false,
};
const LOCAL_STORAGE_KEY: string = 'CURRENT_USER_STATE';

export const CurrentUserStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withLocalStorage<CurrentUserState>(LOCAL_STORAGE_KEY),
  withMethods((store) => ({
    updateIsAuthorized(isAuthorized: boolean): void {
      patchState(store, () => ({ isAuthorized }));
    },
  }))
);
