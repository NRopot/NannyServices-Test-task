import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@app/declarations/interfaces/user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Pagination } from '@app/declarations/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersRequestsService {
  private readonly baseUrl: string = 'http://localhost:3000/api';

  constructor(private readonly httpClient: HttpClient) {}
  public getUsers({ pageSize, pageIndex }: Pagination): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`, {
      params: {
        pageSize,
        pageIndex,
      },
      observe: 'response',
    });
  }

  public putUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/users/${user.id}`, user);
  }

  public postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users`, user);
  }

  public deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  public getAllUsers(): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/allUsers`, {
      observe: 'response',
    });
  }
}
