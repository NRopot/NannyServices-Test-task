import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { User } from '@app/declarations/interfaces/user.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { of, pipe, switchMap, tap } from 'rxjs';
import { UsersRequestsService } from '@app/services/requests/users-requests.service';

type UsersState = {
  users: User[];
  isLoading: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const UsersStore = signalStore(
  { providedIn: 'root' },

  withState<UsersState>(initialState),

  withComputed((store) => ({
    usersCount: computed(() => store.users().length),
  })),

  withMethods(({ users, ...store }, usersRequestsService: UsersRequestsService = inject(UsersRequestsService)) => ({
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
  })),

  withHooks({
    onInit({ loadUsers }) {
      loadUsers(of([]));
    },
  })
);
