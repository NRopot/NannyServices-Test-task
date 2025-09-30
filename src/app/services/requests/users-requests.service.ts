import { Injectable } from '@angular/core';
import USERS from '@app/mocked-data/users.json';
import { Observable, of } from 'rxjs';
import { User } from '@app/declarations/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersRequestsService {
  public get(): Observable<User[]> {
    return of(USERS as User[]);
  }
}
