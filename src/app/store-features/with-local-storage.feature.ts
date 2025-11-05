import { signalStoreFeature, type, withMethods, patchState, getState } from '@ngrx/signals';
import { effect, inject, PLATFORM_ID } from '@angular/core';
import { isNil } from '@app/functions/is-nil.function';
import { isPlatformBrowser } from '@angular/common';

export function withLocalStorage<T extends object>(key: string) {
  return signalStoreFeature(
    { state: type<T>() },
    withMethods((store) => {
      const platformId: any = inject(PLATFORM_ID);

      let localStorageRef: Storage | undefined;
      const isBrowser = isPlatformBrowser(platformId);

      if (!isBrowser) {
        return {};
      }

      localStorageRef = localStorage;

      effect(() => {
        try {
          const state: T = getState(store);

          localStorageRef.setItem(key, JSON.stringify(state));
        } catch (error) {
          console.error(error);
        }
      });

      const savedState: string | null = localStorageRef.getItem(key);

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

          localStorageRef.setItem(key, JSON.stringify(state));
        },

        clearStorage(): void {
          localStorageRef.removeItem(key);
        },
      };
    })
  );
}
