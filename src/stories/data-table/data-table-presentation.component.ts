import { CommonModule } from '@angular/common';
import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ContentChildren, QueryList, TemplateRef,
  OnInit, OnChanges, SimpleChanges, inject,
} from '@angular/core';
import {
  DataTableColumn,
  DataTableRow,
  SortState,
  FilterState,
  PaginationState,
  DataTableConfig,
} from './data-table.types';
import { DataTableService } from './data-table.service';
import { DataTableCellDefDirective } from './data-table-cell-def.directive';

/**
 * Primary design-system API.
 *
 * Simple by default:
 *  - Pass columns + data and the component handles table state internally.
 *
 * Advanced when needed:
 *  - Listen to outputs (selectionChange, sortChange, filterStateChange,
 *    paginationChange, viewChange) and integrate with app-level orchestration.
 *
 * The headless service remains optional infrastructure that powers the default
 * behavior here and can also be used directly by advanced consumers.
 */
@Component({
  selector: 'flywheel-data-table',
  standalone: true,
  imports: [CommonModule, DataTableCellDefDirective],
  providers: [DataTableService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-table-presentation.component.html',
  styleUrls: ['./data-table-presentation.css'],
})
export class DataTablePresentationComponent implements OnInit, OnChanges {
  // ─── Inputs (simple public API) ───────────────────────────────────────────
  @Input() columns: DataTableColumn[] = [];
  @Input() data: DataTableRow[] = [];
  @Input() config: DataTableConfig = {};

  /** External loading flag (useful when rows are fetched async by parent). */
  @Input() isLoading = false;

  // ─── Outputs (advanced integration hooks) ────────────────────────────────
  @Output() selectionChange = new EventEmitter<DataTableRow[]>();
  @Output() sortChange = new EventEmitter<SortState>();
  @Output() filterStateChange = new EventEmitter<FilterState>();
  @Output() paginationChange = new EventEmitter<PaginationState>();
  @Output() viewChange = new EventEmitter<'table' | 'grid'>();
  @Output() actionsClick = new EventEmitter<DataTableRow[]>();
  @Output() allGroupsClick = new EventEmitter<void>();
  @Output() filtersClick = new EventEmitter<void>();

  readonly service = inject(DataTableService);

  ngOnInit(): void {
    this.syncFromInputs();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.syncFromInputs();
  }

  private syncFromInputs(): void {
    this.service.initialize(this.columns, this.config.defaultPageSize ?? 20);
    this.service.setRows(this.data);
    this.service.setLoading(this.isLoading);
  }

  // ─── Custom cell template projection ──────────────────────────────────────
  @ContentChildren(DataTableCellDefDirective)
  cellDefs!: QueryList<DataTableCellDefDirective>;

  getCellTemplate(columnKey: string): TemplateRef<unknown> | null {
    return this.cellDefs?.find(d => d.column === columnKey)?.template ?? null;
  }

  // ─── View model getters consumed by the template ─────────────────────────
  get rows(): DataTableRow[] {
    return this.service.visibleRows();
  }

  get selectedIds(): Set<string | number> {
    return this.service.selectedIds();
  }

  get sortState(): SortState {
    return this.service.sortState();
  }

  get filterState(): FilterState {
    return this.service.filterState();
  }

  get pagination(): PaginationState {
    return this.service.pagination();
  }

  get totalCount(): number {
    return this.service.totalCount();
  }

  get totalPages(): number {
    return this.service.totalPages();
  }

  get isAllSelected(): boolean {
    return this.service.isAllSelected();
  }

  get isIndeterminate(): boolean {
    return this.service.isIndeterminate();
  }

  get activeView(): 'table' | 'grid' {
    return this.service.activeView();
  }

  get showCheckboxes(): boolean {
    return this.config.canSelect !== false;
  }

  get showFilters(): boolean {
    return this.config.canFilter === true;
  }

  get allowSort(): boolean {
    return this.config.canSort !== false;
  }

  get pageSizeOptions(): number[] {
    return this.config.pageSizeOptions?.length ? this.config.pageSizeOptions : [10, 20, 50, 100];
  }

  // ─── Interaction handlers ────────────────────────────────────────────────
  onRowSelect(id: string | number): void {
    this.service.toggleRowSelection(id);
    this.selectionChange.emit(this.service.getSelectedRows());
  }

  onSelectAll(): void {
    this.service.toggleSelectAll();
    this.selectionChange.emit(this.service.getSelectedRows());
  }

  onSort(column: string): void {
    this.service.sort(column);
    this.sortChange.emit(this.service.sortState());
    this.paginationChange.emit(this.service.pagination());
  }

  onFilterChange(column: string, value: string): void {
    this.service.setFilter(column, value);
    this.filterStateChange.emit(this.service.filterState());
    this.paginationChange.emit(this.service.pagination());
  }

  onPageChange(page: number): void {
    this.service.setPage(page);
    this.paginationChange.emit(this.service.pagination());
  }

  onPageSizeChange(pageSize: number): void {
    this.service.setPageSize(pageSize);
    this.paginationChange.emit(this.service.pagination());
  }

  onViewChange(view: 'table' | 'grid'): void {
    this.service.setView(view);
    this.viewChange.emit(view);
  }

  onActionsClick(): void {
    this.actionsClick.emit(this.service.getSelectedRows());
  }

  isSelected(id: string | number): boolean {
    return this.selectedIds.has(id);
  }

  getSortIcon(column: string): 'asc' | 'desc' | null {
    if (this.sortState.column !== column) return null;
    return this.sortState.direction as 'asc' | 'desc' | null;
  }

  getFilterValue(column: string): string {
    return this.filterState[column] ?? '';
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  trackById(_index: number, row: DataTableRow): string | number {
    return row['id'] as string | number;
  }
}
