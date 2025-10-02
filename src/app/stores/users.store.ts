import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { User } from '@app/declarations/interfaces/user.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { filter, of, pipe, switchMap, tap } from 'rxjs';
import { UsersRequestsService } from '@app/services/requests/users-requests.service';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';
import { NavigationService } from '@app/services/navigation.service';
import { Params } from '@angular/router';
import { isNil } from '@app/functions/is-nil.function';
import { HttpResponse } from '@angular/common/http';

type UsersState = {
  users: User[];
  isLoading: boolean;
  customersCount: number;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  customersCount: 0,
};
const PAGINATION_TOTAL_ITEMS_KEY = 'PAGINATION_TOTAL_ITEMS';

export const UsersStore = signalStore(
  { providedIn: 'root' },

  withState<UsersState>(initialState),

  withComputed(({ users, customersCount }) => ({
    customers: computed(() => users().filter((user: User) => user.role === UserRoles.Customer)),
    customersCount: computed(() => customersCount()),
  })),

  withMethods(
    (
      { users, customers, customersCount, ...store },
      usersRequestsService: UsersRequestsService = inject(UsersRequestsService),
      navigationService: NavigationService = inject(NavigationService)
    ) => ({
      updateUser(updatedUser: User): void {
        patchState(store, (state: UsersState) => ({
          users: state.users.map((stateUser: User) =>
            stateUser.id === updatedUser.id ? { ...stateUser, ...updatedUser } : stateUser
          ),
        }));

        usersRequestsService.putUser(updatedUser).subscribe();
      },
      addUser(newUser: User): void {
        patchState(store, (state) => ({ users: [...state.users, newUser] }));
        usersRequestsService.postUser(newUser).subscribe();
      },
      removeUser(id: string): void {
        patchState(store, (state) => ({ users: state.users.filter((stateUser: User) => stateUser.id !== id) }));
      },
      getUserByCredentials(username: string, password: string): User | null {
        return (
          users().find((stateUser: User) => stateUser.username === username && stateUser.password === password) ?? null
        );
      },
      loadUsers: rxMethod<User[]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          //todo need to refactor
          switchMap(() => usersRequestsService.getAllUsers()),
          tapResponse({
            next: (response: HttpResponse<User[]>) => {
              const totalCount: number = Number(response.headers.get(PAGINATION_TOTAL_ITEMS_KEY));
              patchState(store, { users: response.body, customersCount: totalCount });
            },
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          }),
          switchMap(() => navigationService.queryParams$),
          filter((queryParams: Params) => !isNil(queryParams['pageSize']) && !isNil(queryParams['pageIndex'])),
          switchMap(({ pageSize, pageIndex }: Params) =>
            usersRequestsService.getUsers({
              pageIndex,
              pageSize,
            })
          ),
          tapResponse({
            next: (response: HttpResponse<User[]>) => {
              const totalCount: number = Number(response.headers.get(PAGINATION_TOTAL_ITEMS_KEY));
              patchState(store, { users: response.body, customersCount: totalCount });
            },
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
