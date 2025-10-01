import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { User } from '@app/declarations/interfaces/user.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { of, pipe, switchMap, tap } from 'rxjs';
import { UsersRequestsService } from '@app/services/requests/users-requests.service';
import { withLocalStorage } from '@app/store-features/with-local-storage.feature';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';

type UsersState = {
  users: User[];
  isLoading: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
};
const LOCAL_STORAGE_KEY: string = 'USERS_STATE';

export const UsersStore = signalStore(
  { providedIn: 'root' },

  withState<UsersState>(initialState),

  withComputed(({ users }) => ({
    customers: computed(() => users().filter((user: User) => user.role === UserRoles.Customer)),
  })),

  withComputed(({ customers }) => ({
    customersCount: computed(() => customers().length),
  })),

  withLocalStorage<UsersState>(LOCAL_STORAGE_KEY),

  withMethods(
    ({ users, customers, ...store }, usersRequestsService: UsersRequestsService = inject(UsersRequestsService)) => ({
      updateUser(updatedUser: User): void {
        patchState(store, (state: UsersState) => ({
          users: state.users.map((stateUser: User) =>
            stateUser.id === updatedUser.id ? { ...stateUser, ...updatedUser } : stateUser
          ),
        }));
      },
      addUser(newUser: User): void {
        patchState(store, (state) => ({ users: [...state.users, newUser] }));
      },
      removeUser(id: string): void {
        patchState(store, (state) => ({ users: state.users.filter((stateUser: User) => stateUser.id !== id) }));
      },
      checkCredentials(username: string, password: string): boolean {
        return users().some((stateUser: User) => stateUser.username === username && stateUser.password === password);
      },
      loadUsers: rxMethod<User[]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => usersRequestsService.get()),
          tapResponse({
            next: (users: User[]) => patchState(store, { users }),
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        )
      ),
    })
  ),

  withHooks({
    onInit({ loadUsers, users }) {
      if (users().length === 0) {
        loadUsers(of([]));
      }
    },
  })
);
