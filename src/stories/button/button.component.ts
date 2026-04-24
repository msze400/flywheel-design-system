import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: ` <button
  type="button"
  (click)="onClick.emit($event)"
  [ngClass]="classes"
  [ngStyle]="{ 'background-color': backgroundColor }"
  [disabled]="disabled"
>
  {{ label }}
</button>`,
  styleUrls: ['./button.css'],
})
export class ButtonComponent {
  /** Is this the principal call to action on the page? */
  @Input()
  primary = false;

  /** Use dark mode styling (for dark backgrounds) */
  @Input()
  darkMode = false;

  /** What background color to use */
  @Input()
  backgroundColor?: string;

  /** How large should the button be? */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /** Disable the button */
  @Input()
  disabled = false;

  /** Optional click handler */
  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    const darkModeClass = this.darkMode ? 'storybook-button--dark' : null;

    const disabledClass = this.disabled ? 'storybook-button--disabled' : null;

    return ['storybook-button', `storybook-button--${this.size}`, mode, ...(darkModeClass ? [darkModeClass] : []), ...(disabledClass ? [disabledClass] : [])];
  }
}
