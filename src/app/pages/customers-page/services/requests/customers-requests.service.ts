import { Injectable } from '@angular/core';
import { Customer } from '@app/declarations/interfaces/customer.interface';
import { Observable, of } from 'rxjs';
import CUSTOMERS from '@app/mocked-data/customers.json';

@Injectable()
export class CustomersRequestsService {
  public get(): Observable<Customer[]> {
    return of(CUSTOMERS);
  }
}
