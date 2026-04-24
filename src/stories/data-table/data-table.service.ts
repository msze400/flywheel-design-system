import { Injectable, signal, computed } from '@angular/core';
import { DataTableColumn, DataTableRow, SortState, FilterState, PaginationState, DataTableViewModel } from './data-table.types';

/**
 * Headless facade — owns all table state and derived view logic.
 *
 * Responsibilities:
 *  - Sorting
 *  - Column filtering
 *  - Pagination
 *  - Row selection
 *  - Derived view state (visibleRows, isAllSelected, viewModel)
 *
 * No UI, no DOM. Fully portable and unit-testable.
 */
@Injectable()
export class DataTableService {
  // ─── Private state ────────────────────────────────────────────────────────
  private readonly _rows = signal<DataTableRow[]>([]);
  private readonly _columns = signal<DataTableColumn[]>([]);
  private readonly _selectedIds = signal<Set<string | number>>(new Set());
  private readonly _sortState = signal<SortState>({ column: null, direction: null });
  private readonly _filterState = signal<FilterState>({});
  private readonly _pagination = signal<PaginationState>({ currentPage: 1, pageSize: 20 });
  private readonly _activeView = signal<'table' | 'grid'>('table');
  private readonly _isLoading = signal(false);

  // ─── Public read-only signals ─────────────────────────────────────────────
  readonly columns = this._columns.asReadonly();
  readonly activeView = this._activeView.asReadonly();
  readonly sortState = this._sortState.asReadonly();
  readonly filterState = this._filterState.asReadonly();
  readonly pagination = this._pagination.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  // ─── Derived state ────────────────────────────────────────────────────────

  /** Step 1 — Sort all rows */
  private readonly _sortedRows = computed(() => {
    const rows = [...this._rows()];
    const sort = this._sortState();
    if (!sort.column || !sort.direction) return rows;
    return rows.sort((a, b) => {
      const aVal = String(a[sort.column!] ?? '');
      const bVal = String(b[sort.column!] ?? '');
      const cmp = aVal.localeCompare(bVal);
      return sort.direction === 'asc' ? cmp : -cmp;
    });
  });

  /** Step 2 — Filter sorted rows by active column filters */
  readonly filteredRows = computed(() => {
    const rows = this._sortedRows();
    const filters = this._filterState();
    const activeFilters = Object.entries(filters).filter(([, v]) => v.trim() !== '');
    if (activeFilters.length === 0) return rows;
    return rows.filter(row =>
      activeFilters.every(([key, value]) =>
        String(row[key] ?? '').toLowerCase().includes(value.toLowerCase())
      )
    );
  });

  readonly totalCount = computed(() => this.filteredRows().length);
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalCount() / this._pagination().pageSize))
  );

  /** Step 3 — Paginate filtered rows — this is what the table renders */
  readonly visibleRows = computed(() => {
    const { currentPage, pageSize } = this._pagination();
    const start = (currentPage - 1) * pageSize;
    return this.filteredRows().slice(start, start + pageSize);
  });

  readonly selectedIds = computed(() => this._selectedIds());

  readonly isAllSelected = computed(() => {
    const rows = this.visibleRows();
    const selected = this._selectedIds();
    return rows.length > 0 && rows.every(r => selected.has(r['id'] as string | number));
  });

  readonly isIndeterminate = computed(() => {
    const selected = this._selectedIds();
    const rows = this.visibleRows();
    return selected.size > 0 && !rows.every(r => selected.has(r['id'] as string | number));
  });

  /** Single snapshot consumed by the container template */
  readonly viewModel = computed<DataTableViewModel>(() => ({
    rows: this.visibleRows(),
    columns: this._columns(),
    selectedIds: this._selectedIds(),
    sortState: this._sortState(),
    filterState: this._filterState(),
    pagination: this._pagination(),
    totalCount: this.totalCount(),
    totalPages: this.totalPages(),
    isAllSelected: this.isAllSelected(),
    isIndeterminate: this.isIndeterminate(),
    activeView: this._activeView(),
    isLoading: this._isLoading(),
  }));

  // ─── Mutations ────────────────────────────────────────────────────────────

  /** Called once by the container to set column definitions and page size config */
  initialize(columns: DataTableColumn[], pageSize = 20): void {
    this._columns.set(columns);
    this._pagination.update(p => ({ ...p, pageSize }));
  }

  /** Replace the row dataset (e.g. after a fetch completes) */
  setRows(rows: DataTableRow[]): void {
    this._rows.set(rows);
    this._selectedIds.set(new Set());
    this._pagination.update(p => ({ ...p, currentPage: 1 }));
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  // ─── Sorting ──────────────────────────────────────────────────────────────

  sort(column: string): void {
    this._sortState.update(current => {
      if (current.column !== column) return { column, direction: 'asc' };
      if (current.direction === 'asc') return { column, direction: 'desc' };
      return { column: null, direction: null };
    });
    this._pagination.update(p => ({ ...p, currentPage: 1 }));
  }

  // ─── Filtering ────────────────────────────────────────────────────────────

  setFilter(column: string, value: string): void {
    this._filterState.update(f => ({ ...f, [column]: value }));
    this._pagination.update(p => ({ ...p, currentPage: 1 }));
  }

  clearFilters(): void {
    this._filterState.set({});
    this._pagination.update(p => ({ ...p, currentPage: 1 }));
  }

  // ─── Pagination ───────────────────────────────────────────────────────────

  setPage(page: number): void {
    const total = this.totalPages();
    this._pagination.update(p => ({ ...p, currentPage: Math.max(1, Math.min(page, total)) }));
  }

  setPageSize(pageSize: number): void {
    this._pagination.set({ pageSize, currentPage: 1 });
  }

  // ─── Row selection ────────────────────────────────────────────────────────

  toggleRowSelection(id: string | number): void {
    this._selectedIds.update(selected => {
      const next = new Set(selected);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this._selectedIds.set(new Set());
    } else {
      const allIds = this.visibleRows().map(r => r['id'] as string | number);
      this._selectedIds.set(new Set(allIds));
    }
  }

  setView(view: 'table' | 'grid'): void {
    this._activeView.set(view);
  }

  getSelectedRows(): DataTableRow[] {
    const selected = this._selectedIds();
    return this.filteredRows().filter(r => selected.has(r['id'] as string | number));
  }
}
