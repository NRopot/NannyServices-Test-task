import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';
import { Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { isNil } from '@app/functions/is-nil.function';
import { take } from 'rxjs';

@Injectable()
export class PaginationServiceService {
  private readonly queryParams: Signal<Params> = toSignal(this.navigationService.queryParams$);

  public readonly pageSize: WritableSignal<number> = signal<number>(5);
  public readonly pageIndex: WritableSignal<number> = signal<number>(0);

  constructor(private readonly navigationService: NavigationService) {
    this.initPagination();
  }

  public getItemsWithPagination<T>(array: T[]): T[] {
    const queryParams: Params = this.queryParams();
    const pageSize: number = Number(queryParams['pageSize'] ?? 5);
    const pageIndex: number = Number(queryParams['pageIndex'] ?? 0);

    const endIndex: number = pageSize * (pageIndex + 1);
    const startIndex: number = endIndex - pageSize;

    return array.slice(startIndex, endIndex);
  }

  private initPagination(): void {
    this.navigationService.queryParams$.pipe(take(1)).subscribe(({ pageSize, pageIndex }: Params) => {
      if (isNil(pageSize) || isNil(pageIndex)) {
        this.navigationService.setQueryParams({
          pageSize: this.pageSize(),
          pageIndex: this.pageIndex(),
        });
        return;
      }

      this.pageSize.set(pageSize);
      this.pageIndex.set(pageIndex);
    });
  }
}
