import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'flywheel-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  template: `
    <fieldset class="radio-group" [class.radio-group--disabled]="disabled">
      <legend *ngIf="label" class="radio-group__label">{{ label }}</legend>
      <div class="radio-group__options" [class.radio-group--horizontal]="orientation === 'horizontal'">
        <label
          *ngFor="let option of options"
          class="radio-option"
          [class.radio-option--selected]="selectedValue === option.value"
          [class.radio-option--disabled]="option.disabled || disabled"
        >
          <input
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="selectedValue === option.value"
            [disabled]="option.disabled || disabled"
            (change)="onSelect(option.value)"
            class="radio-option__input"
          />
          <span class="radio-option__circle">
            <span class="radio-option__dot"></span>
          </span>
          <span class="radio-option__label">{{ option.label }}</span>
        </label>
      </div>
    </fieldset>
  `,
  styleUrls: ['./radio-group.css'],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() name = 'radio-group';
  @Input() options: RadioOption[] = [];
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  selectedValue: string | null = null;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onSelect(value: string): void {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
