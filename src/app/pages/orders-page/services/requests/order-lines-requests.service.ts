import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import ORDER_LINES from '@app/mocked-data/order-lines.json';
import { OrderLine } from '@app/declarations/interfaces/order-line.interface';

@Injectable()
export class OrderLinesRequestsService {
  public get(): Observable<OrderLine[]> {
    return of(ORDER_LINES);
  }
}
