import { Injectable, Signal } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';
import { Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class PaginationServiceService {
  public readonly queryParams: Signal<Params> = toSignal<Params>(this.navigationService.queryParams$);

  constructor(private readonly navigationService: NavigationService) {}

  public getItemsWithPagination<T>(array: T[]): T[] {
    const queryParams: Params = this.queryParams();
    const pageSize: number = Number(queryParams['pageSize'] ?? 5);
    const pageIndex: number = Number(queryParams['pageIndex'] ?? 0);

    const endIndex: number = pageSize * (pageIndex + 1);
    const startIndex: number = endIndex - pageSize;

    return array.slice(startIndex, endIndex);
  }
}
