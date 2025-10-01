import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
  signal,
  TemplateRef,
  TrackByFunction,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableConfig } from '@app/declarations/interfaces/table-config.interface';
import { Observable, ReplaySubject, take } from 'rxjs';
import { Column } from '@app/declarations/interfaces/column.interface';
import { ColumnTypes } from '@app/declarations/enums/column-types.enum';
import { isNil } from '@app/functions/is-nil.function';
import { NavigationService } from '@app/services/navigation.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule],
})
export class TableComponent<T extends object = object> implements OnInit {
  @Input({ required: true }) public tableConfig: TableConfig<T>;
  @Input() public actionsTemplate: TemplateRef<unknown> | undefined;

  private readonly displayedColumnsState$: ReplaySubject<Column<T>['id'][]> = new ReplaySubject<Column<T>['id'][]>(1);
  public readonly displayedColumns$: Observable<Column<T>['id'][]> = this.displayedColumnsState$.asObservable();

  public readonly columnTypes: typeof ColumnTypes = ColumnTypes;

  public readonly pageSize: WritableSignal<number> = signal<number>(5);
  public readonly pageIndex: WritableSignal<number> = signal<number>(0);

  constructor(private readonly navigationService: NavigationService) {}

  public ngOnInit(): void {
    this.initDisplayColumns();
    this.initPagination();
  }

  public readonly trackByFunction: TrackByFunction<Column<T>> = (_: number, item: Column<T>) => item.id;

  public handlePageEvent(event: PageEvent): void {
    this.navigationService.setQueryParams({
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
    });
  }

  private initDisplayColumns(): void {
    const displayedColumns: Column<T>['id'][] = this.tableConfig.columns.map((column: Column<T>) => column.id);

    if (!isNil(this.actionsTemplate)) {
      displayedColumns.push('actions');
    }

    this.displayedColumnsState$.next(displayedColumns);
  }

  private initPagination(): void {
    this.navigationService.queryParams$.pipe(take(1)).subscribe(({ pageSize, pageIndex }: Params) => {
      if (isNil(pageSize) || isNil(pageIndex)) {
        this.navigationService.setQueryParams({
          pageSize: this.pageSize(),
          pageIndex: this.pageIndex(),
        });
      }
    });
  }
}
