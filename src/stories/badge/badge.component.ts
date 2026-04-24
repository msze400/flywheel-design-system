import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flywheel-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="badge" 
      [class]="classes"
      [class.badge--clickable]="clickable"
    >
      <span *ngIf="icon" class="badge__icon">
        <ng-container [ngSwitch]="icon">
          <svg *ngSwitchCase="'diagnostic'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <svg *ngSwitchCase="'reader'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <svg *ngSwitchCase="'check'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <svg *ngSwitchCase="'clock'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </ng-container>
      </span>
      {{ label }}
    </span>
  `,
  styleUrls: ['./badge.css'],
})
export class BadgeComponent {
  @Input() label = '';
  @Input() variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'muted' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon: 'diagnostic' | 'reader' | 'check' | 'clock' | null = null;
  @Input() clickable = false;
  @Input() selected = false;

  get classes(): string[] {
    return [
      `badge--${this.variant}`,
      `badge--${this.size}`,
      this.selected ? 'badge--selected' : '',
    ].filter(Boolean);
  }
}
