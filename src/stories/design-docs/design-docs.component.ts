import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface GuidelineItem {
  description: string;
  example?: string;
}

export interface VisualExample {
  doLabel: string;
  doDescription: string;
  dontLabel: string;
  dontDescription: string;
}

export interface DesignGuidelines {
  title?: string;
  overview?: string;
  dos: GuidelineItem[];
  donts: GuidelineItem[];
  usageTips?: string[];
  visualExamples?: VisualExample[];
}

@Component({
  selector: 'flywheel-design-docs',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="design-docs">
      <h1 *ngIf="title" class="design-docs__title">{{ title }}</h1>
      
      <p *ngIf="overview" class="design-docs__overview">{{ overview }}</p>

      <!-- Visual Examples Section -->
      <section *ngIf="guidelines.visualExamples?.length" class="design-docs__visual-section">
        <div *ngFor="let example of guidelines.visualExamples" class="design-docs__visual-pair">
          <!-- Do Example -->
          <div class="design-docs__visual-card design-docs__visual-card--do">
            <div class="design-docs__preview">
              <storybook-button [primary]="true" [label]="example.doLabel" size="medium"></storybook-button>
            </div>
            <div class="design-docs__visual-footer">
              <div class="design-docs__visual-label">
                <span class="design-docs__icon design-docs__icon--do">✓</span>
                Do
              </div>
              <p class="design-docs__visual-description">{{ example.doDescription }}</p>
            </div>
          </div>

          <!-- Don't Example -->
          <div class="design-docs__visual-card design-docs__visual-card--dont">
            <div class="design-docs__preview">
              <storybook-button [primary]="true" [label]="example.dontLabel" size="medium"></storybook-button>
            </div>
            <div class="design-docs__visual-footer">
              <div class="design-docs__visual-label design-docs__visual-label--dont">
                <span class="design-docs__icon design-docs__icon--dont">✕</span>
                Don't
              </div>
              <p class="design-docs__visual-description">{{ example.dontDescription }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Text Guidelines Section -->
      <div *ngIf="guidelines.dos.length || guidelines.donts.length" class="design-docs__grid">
        <section class="design-docs__section design-docs__section--do">
          <h2 class="design-docs__section-title">
            <span class="design-docs__icon design-docs__icon--do">✓</span>
            Do
          </h2>
          <ul class="design-docs__list">
            <li *ngFor="let item of guidelines.dos" class="design-docs__item">
              <span class="design-docs__description">{{ item.description }}</span>
              <code *ngIf="item.example" class="design-docs__example">{{ item.example }}</code>
            </li>
          </ul>
        </section>

        <section class="design-docs__section design-docs__section--dont">
          <h2 class="design-docs__section-title">
            <span class="design-docs__icon design-docs__icon--dont">✕</span>
            Don't
          </h2>
          <ul class="design-docs__list">
            <li *ngFor="let item of guidelines.donts" class="design-docs__item">
              <span class="design-docs__description">{{ item.description }}</span>
              <code *ngIf="item.example" class="design-docs__example">{{ item.example }}</code>
            </li>
          </ul>
        </section>
      </div>

      <section *ngIf="guidelines.usageTips?.length" class="design-docs__tips">
        <h2 class="design-docs__section-title">
          <span class="design-docs__icon design-docs__icon--tip">💡</span>
          Usage Tips
        </h2>
        <ul class="design-docs__tip-list">
          <li *ngFor="let tip of guidelines.usageTips" class="design-docs__tip">
            {{ tip }}
          </li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .design-docs {
      font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 2rem;
      box-sizing: border-box;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .design-docs__title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .design-docs__overview {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 2rem 0;
    }

    /* Visual Examples */
    .design-docs__visual-section {
      margin-bottom: 2.5rem;
    }

    .design-docs__visual-pair {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
      align-items: start;
    }

    /* Stack vertically on smaller screens to avoid overflowing horizontally */
    @media (max-width: 880px) {
      .design-docs__visual-pair {
        grid-template-columns: 1fr;
      }
    }

    .design-docs__visual-card {
      border-radius: 12px;
      overflow: hidden;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }

    .design-docs__preview {
      background: #f1f5f9;
      padding: 3rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .design-docs__visual-footer {
      padding: 1rem 1.25rem 1.25rem;
    }

    .design-docs__visual-card--do .design-docs__visual-footer {
      border-bottom: 4px solid #10B981;
    }

    .design-docs__visual-card--dont .design-docs__visual-footer {
      border-bottom: 4px solid #EF4444;
    }

    .design-docs__visual-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 1rem;
      color: #10B981;
      margin-bottom: 0.5rem;
    }

    .design-docs__visual-label--dont {
      color: #EF4444;
    }

    .design-docs__visual-description {
      font-size: 0.9375rem;
      color: #64748b;
      line-height: 1.5;
      margin: 0;
    }

    /* Text Guidelines Grid */
    .design-docs__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .design-docs__section {
      background: #f8fafc;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
    }

    .design-docs__section--do {
      border-top: 4px solid #10B981;
    }

    .design-docs__section--dont {
      border-top: 4px solid #EF4444;
    }

    .design-docs__section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .design-docs__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-size: 0.875rem;
      font-weight: 700;
    }

    .design-docs__icon--do {
      background: #10B981;
      color: white;
    }

    .design-docs__icon--dont {
      background: #EF4444;
      color: white;
    }

    .design-docs__icon--tip {
      background: #F59E0B;
      font-size: 0.75rem;
    }

    .design-docs__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .design-docs__item {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .design-docs__item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .design-docs__description {
      font-size: 0.9375rem;
      color: #475569;
      line-height: 1.5;
    }

    .design-docs__example {
      font-family: 'Fira Code', monospace;
      font-size: 0.8125rem;
      background: #e2e8f0;
      padding: 0.375rem 0.625rem;
      border-radius: 6px;
      color: #475569;
    }

    .design-docs__tips {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .design-docs__tip-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .design-docs__tip {
      font-size: 0.9375rem;
      color: #92400e;
      padding: 0.5rem 0;
      padding-left: 1.25rem;
      position: relative;
    }

    .design-docs__tip::before {
      content: "→";
      position: absolute;
      left: 0;
      color: #d97706;
    }
  `],
})
export class DesignDocsComponent {
  @Input() title = '';
  @Input() overview = '';
  @Input() guidelines: DesignGuidelines = { dos: [], donts: [] };
}
