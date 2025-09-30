import { signalStoreFeature, type, withMethods, patchState, getState } from '@ngrx/signals';
import { effect } from '@angular/core';
import { isNil } from '@app/functions/is-nil.function';

export function withLocalStorage<T extends object>(key: string) {
  return signalStoreFeature(
    { state: type<T>() },
    withMethods((store) => {
      effect(() => {
        try {
          const state: T = getState(store);

          localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
          console.error(error);
        }
      });

      const savedState: string | null = localStorage.getItem(key);

      if (!isNil(savedState)) {
        try {
          const parsedState: T = JSON.parse(savedState);

          patchState(store, parsedState);
        } catch (error) {
          console.error(error);
        }
      }

      return {
        saveToStorage(): void {
          const state: T = getState(store);

          localStorage.setItem(key, JSON.stringify(state));
        },

        clearStorage(): void {
          localStorage.removeItem(key);
        },
      };
    })
  );
}
