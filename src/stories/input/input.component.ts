import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'flywheel-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="flywheel-input" [ngClass]="classes">
      <span *ngIf="label" class="flywheel-input__label">{{ label }}</span>
      <div class="flywheel-input__control">
        <input
          class="flywheel-input__field"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readOnly]="readonly"
          [attr.aria-label]="ariaLabel || label || placeholder"
          (input)="handleInput($event)"
        />
      </div>
      <span *ngIf="helperText" class="flywheel-input__helper">{{ helperText }}</span>
    </label>
  `,
  styleUrls: ['./input.css'],
})
export class InputComponent {
  @Input()
  label?: string;

  @Input()
  helperText?: string;

  @Input()
  placeholder = 'Enter additional info';

  @Input()
  value = '';

  @Input()
  type = 'text';

  @Input()
  size: 'small' | 'medium' | 'large' = 'large';

  @Input()
  theme: 'light' | 'dark' = 'dark';

  @Input()
  variant: 'contained' | 'outline' = 'contained';

  @Input()
  state: 'enabled' | 'focused' | 'pressed' | 'disabled' = 'enabled';

  @Input()
  disabled = false;

  @Input()
  readonly = false;

  @Input()
  ariaLabel?: string;

  @Output()
  valueChange = new EventEmitter<string>();

  get classes(): string[] {
    const disabled = this.disabled || this.state === 'disabled';

    return [
      `flywheel-input--${this.size}`,
      `flywheel-input--${this.theme}`,
      `flywheel-input--${this.variant}`,
      `flywheel-input--${this.state}`,
      disabled ? 'flywheel-input--disabled' : '',
    ].filter(Boolean);
  }

  handleInput(event: Event): void {
    const nextValue = (event.target as HTMLInputElement).value;
    this.value = nextValue;
    this.valueChange.emit(nextValue);
  }
}
