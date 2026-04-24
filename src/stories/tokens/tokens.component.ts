import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ColorToken {
  name: string;
  variable: string;
  value: string;
}

interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
}

@Component({
  selector: 'flywheel-tokens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tokens-page">
      <h1 class="tokens-title">Design Tokens</h1>
      
      <section class="tokens-section">
        <h2 class="tokens-section-title">Colors</h2>
        <div class="tokens-grid">
          <div *ngFor="let color of colors" class="token-card">
            <div 
              class="color-swatch" 
              [style.background-color]="color.value"
              [class.light-border]="isLightColor(color.value)"
            ></div>
            <div class="token-info">
              <span class="token-name">{{ color.name }}</span>
              <code class="token-variable">{{ color.variable }}</code>
              <span class="token-value">{{ color.value }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="tokens-section">
        <h2 class="tokens-section-title">Spacing</h2>
        <div class="spacing-list">
          <div *ngFor="let space of spacing" class="spacing-item">
            <div class="spacing-info">
              <span class="token-name">{{ space.name }}</span>
              <span class="token-value">{{ space.value }} ({{ space.pixels }}px)</span>
            </div>
            <div class="spacing-visual">
              <div class="spacing-bar" [style.width.px]="space.pixels"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="tokens-section">
        <h2 class="tokens-section-title">Typography</h2>
        <div class="typography-list">
          <div *ngFor="let type of typography" class="typography-item">
            <div class="typography-info">
              <span class="token-name">{{ type.name }}</span>
              <span class="token-value">{{ type.size }} / {{ type.weight }}</span>
            </div>
            <p class="typography-sample" [style.font-size]="type.size" [style.font-weight]="type.weight">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      <section class="tokens-section">
        <h2 class="tokens-section-title">Border Radius</h2>
        <div class="tokens-grid">
          <div *ngFor="let radius of borderRadius" class="token-card">
            <div class="radius-swatch" [style.border-radius]="radius.value"></div>
            <div class="token-info">
              <span class="token-name">{{ radius.name }}</span>
              <span class="token-value">{{ radius.value }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./tokens.css'],
})
export class TokensComponent {
  colors: ColorToken[] = [
    { name: 'Primary', variable: '--color-primary', value: '#155DFC' },
    { name: 'Primary Hover', variable: '--color-hover', value: '#1447E6' },
    { name: 'Primary Contrast', variable: '--color-primary-contrast', value: '#ffffff' },
    { name: 'Text Default', variable: '--color-text-default', value: '#333333' },
    { name: 'Header Background', variable: '--color-header-background', value: 'rgba(6, 4, 35, 0.85)' },
    { name: 'Secondary Border', variable: '--color-secondary-border', value: 'rgba(0, 0, 0, 0.15)' },
    { name: 'Secondary Border Inverse', variable: '--color-secondary-border-inverse', value: 'rgba(255, 255, 255, 0.6)' },
    { name: 'Success', variable: '--color-success', value: '#10B981' },
    { name: 'Warning', variable: '--color-warning', value: '#F59E0B' },
    { name: 'Error', variable: '--color-error', value: '#EF4444' },
    { name: 'Gray 100', variable: '--color-gray-100', value: '#F3F4F6' },
    { name: 'Gray 200', variable: '--color-gray-200', value: '#E5E7EB' },
    { name: 'Gray 300', variable: '--color-gray-300', value: '#D1D5DB' },
    { name: 'Gray 500', variable: '--color-gray-500', value: '#6B7280' },
    { name: 'Gray 700', variable: '--color-gray-700', value: '#374151' },
    { name: 'Gray 900', variable: '--color-gray-900', value: '#1F2937' },
  ];

  spacing: SpacingToken[] = [
    { name: 'Extra Small', value: '0.25rem', pixels: 4 },
    { name: 'Small', value: '0.5rem', pixels: 8 },
    { name: 'Medium', value: '1rem', pixels: 16 },
    { name: 'Large', value: '1.5rem', pixels: 24 },
    { name: 'Extra Large', value: '2rem', pixels: 32 },
    { name: '2X Large', value: '3rem', pixels: 48 },
    { name: '3X Large', value: '4rem', pixels: 64 },
  ];

  typography = [
    { name: 'Heading 1', size: '2.5rem', weight: '700' },
    { name: 'Heading 2', size: '2rem', weight: '600' },
    { name: 'Heading 3', size: '1.5rem', weight: '600' },
    { name: 'Body Large', size: '1.125rem', weight: '400' },
    { name: 'Body', size: '1rem', weight: '400' },
    { name: 'Body Small', size: '0.875rem', weight: '400' },
    { name: 'Caption', size: '0.75rem', weight: '400' },
  ];

  borderRadius = [
    { name: 'None', value: '0' },
    { name: 'Small', value: '4px' },
    { name: 'Medium', value: '8px' },
    { name: 'Large', value: '12px' },
    { name: 'Full', value: '9999px' },
  ];

  isLightColor(color: string): boolean {
    if (color.startsWith('rgba')) return false;
    if (color === '#ffffff' || color === '#fff') return true;
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.8;
    }
    return false;
  }
}
