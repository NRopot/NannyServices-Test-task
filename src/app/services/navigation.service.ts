import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter, map, Observable, shareReplay } from 'rxjs';

@Injectable()
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
    map((url: string) => url.split('/')[1]),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  constructor(private readonly router: Router) {}
}
