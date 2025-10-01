import { Injectable } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Params, QueryParamsHandling, Router } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly routerEvents$: Observable<Event> = this.router.events.pipe(
    filter((event: Event) => event instanceof NavigationEnd),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  public readonly activePage$: Observable<string> = this.routerEvents$.pipe(
    map(() => this.router.url),
    map((url: string) => url.split(/[\/?]/g)[1]),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  public readonly queryParams$: Observable<Params> = this.routerEvents$.pipe(
    switchMap(() => this.activatedRoute.queryParams),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public setQueryParams(queryParams: Params, queryParamsHandling: QueryParamsHandling = 'merge'): void {
    this.router.navigate([], { replaceUrl: true, queryParams, queryParamsHandling });
  }
}
