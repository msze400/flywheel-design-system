import { Directive, Input, TemplateRef } from '@angular/core';
import { DataTableRow } from './data-table.types';

export interface DataTableCellContext {
  /** The value of this cell (i.e. row[column.key]) */
  $implicit: unknown;
  /** The full row object so templates can access sibling values */
  row: DataTableRow;
}

/**
 * Marks an ng-template as a custom cell renderer for a specific column.
 *
 * Usage:
 *   <ng-template flywheelCellDef="subject" let-value let-row="row">
 *     <a [routerLink]="['/subjects', row.id]">{{ value }}</a>
 *   </ng-template>
 */
@Directive({
  selector: '[flywheelCellDef]',
  standalone: true,
})
export class DataTableCellDefDirective {
  @Input('flywheelCellDef') column!: string;

  constructor(public template: TemplateRef<DataTableCellContext>) {}
}
