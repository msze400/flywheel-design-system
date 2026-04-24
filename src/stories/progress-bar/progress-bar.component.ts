import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flywheel-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-bar" [class]="'progress-bar--' + size">
      <div *ngIf="showLabel" class="progress-bar__header">
        <span class="progress-bar__label">{{ label }}</span>
        <span class="progress-bar__value">
          <ng-container *ngIf="showFraction">{{ current }} / {{ total }}</ng-container>
          <ng-container *ngIf="!showFraction">{{ percentage }}%</ng-container>
          {{ suffix }}
        </span>
      </div>
      <div class="progress-bar__track">
        <div 
          class="progress-bar__fill"
          [class.progress-bar__fill--complete]="percentage >= 100"
          [class.progress-bar__fill--warning]="variant === 'warning'"
          [class.progress-bar__fill--error]="variant === 'error'"
          [style.width.%]="percentage"
        ></div>
      </div>
    </div>
  `,
  styleUrls: ['./progress-bar.css'],
})
export class ProgressBarComponent {
  @Input() current = 0;
  @Input() total = 100;
  @Input() label = 'Progress';
  @Input() suffix = 'completed';
  @Input() showLabel = true;
  @Input() showFraction = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'default' | 'warning' | 'error' = 'default';

  get percentage(): number {
    if (this.total === 0) return 0;
    return Math.min(100, Math.round((this.current / this.total) * 100));
  }
}
