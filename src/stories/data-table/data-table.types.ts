export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

export interface DataTableRow {
  id: string | number;
  [key: string]: unknown;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export interface FilterState {
  [columnKey: string]: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

/** Permission and display configuration passed from the container */
export interface DataTableConfig {
  canSelect?: boolean;
  canSort?: boolean;
  canFilter?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

/** Derived view model produced by the service and consumed by the presentation component */
export interface DataTableViewModel {
  rows: DataTableRow[];
  columns: DataTableColumn[];
  selectedIds: Set<string | number>;
  sortState: SortState;
  filterState: FilterState;
  pagination: PaginationState;
  totalCount: number;
  totalPages: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  activeView: 'table' | 'grid';
  isLoading: boolean;
}
