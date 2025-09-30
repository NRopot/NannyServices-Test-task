import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type CurrentUserState = {
  isAuthorized: boolean;
};

const initialState: CurrentUserState = {
  isAuthorized: false,
};

export const CurrentUserStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((store) => ({
    updateIsAuthorized(isAuthorized: boolean): void {
      patchState(store, () => ({ isAuthorized }));
    },
  }))
);
