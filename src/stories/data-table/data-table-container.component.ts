import { CommonModule } from '@angular/common';
import {
  Component, Input, Output, EventEmitter,
  OnInit, OnChanges, SimpleChanges, OnDestroy,
} from '@angular/core';
import { Observable, Subscription, of, isObservable } from 'rxjs';
import { DataTablePresentationComponent } from './data-table-presentation.component';
import { DataTableCellDefDirective } from './data-table-cell-def.directive';
import { DataTableColumn, DataTableRow, DataTableConfig, SortState, FilterState, PaginationState } from './data-table.types';

/**
 * Thin convenience wrapper around the primary `flywheel-data-table` component.
 *
 * Responsibilities:
 *  - Accepting static arrays OR Observable data sources
 *  - Managing async loading and error events
 *  - Passing through table config and interaction outputs
 */
@Component({
  selector: 'flywheel-data-table-container',
  standalone: true,
  imports: [CommonModule, DataTablePresentationComponent, DataTableCellDefDirective],
  template: `
    <flywheel-data-table
      [columns]="columns"
      [data]="rows"
      [config]="config"
      [isLoading]="isLoading"
      (selectionChange)="selectionChange.emit($event)"
      (sortChange)="sortChange.emit($event)"
      (filterStateChange)="filterStateChange.emit($event)"
      (paginationChange)="paginationChange.emit($event)"
      (viewChange)="viewChange.emit($event)"
      (actionsClick)="actionsClick.emit($event)"
      (allGroupsClick)="allGroupsClick.emit()"
      (filtersClick)="filtersClick.emit()">
      <ng-content></ng-content>
    </flywheel-data-table>
  `,
})
export class DataTableContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataSource: DataTableRow[] | Observable<DataTableRow[]> = [];
  @Input() columns: DataTableColumn[] = [];
  @Input() config: DataTableConfig = {};

  @Output() selectionChange = new EventEmitter<DataTableRow[]>();
  @Output() sortChange = new EventEmitter<SortState>();
  @Output() filterStateChange = new EventEmitter<FilterState>();
  @Output() paginationChange = new EventEmitter<PaginationState>();
  @Output() actionsClick = new EventEmitter<DataTableRow[]>();
  @Output() allGroupsClick = new EventEmitter<void>();
  @Output() filtersClick = new EventEmitter<void>();
  @Output() viewChange = new EventEmitter<'table' | 'grid'>();
  @Output() dataError = new EventEmitter<unknown>();

  rows: DataTableRow[] = [];
  isLoading = false;

  private _dataSub?: Subscription;

  ngOnInit(): void {
    this._subscribeToDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].firstChange) {
      this._subscribeToDataSource();
    }
  }

  ngOnDestroy(): void {
    this._dataSub?.unsubscribe();
  }

  private _subscribeToDataSource(): void {
    this._dataSub?.unsubscribe();
    const source$ = isObservable(this.dataSource)
      ? this.dataSource
      : of(this.dataSource as DataTableRow[]);

    this.isLoading = true;
    this._dataSub = source$.subscribe({
      next: rows => {
        this.rows = rows;
        this.isLoading = false;
      },
      error: error => {
        this.rows = [];
        this.isLoading = false;
        this.dataError.emit(error);
      },
    });
  }
}
