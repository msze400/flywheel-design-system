import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { moduleMetadata } from '@storybook/angular';

import { ButtonComponent } from './button.component';
import { DesignDocsComponent } from '../design-docs/design-docs.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    darkMode: {
      control: 'boolean',
      description: 'Enable dark mode styling (for dark backgrounds)',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Label',
    size: 'large',
  },
};

export const SecondaryLight: Story = {
  args: {
    primary: false,
    label: 'Draft',
    size: 'large',
    darkMode: false,
  },
};

export const SecondaryDark: Story = {
  args: {
    primary: false,
    label: 'Draft',
    size: 'large',
    darkMode: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1F2937' }],
    },
  },
};

export const ButtonPairLight: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; padding: 20px; background: #ffffff; border-radius: 8px;">
        <storybook-button [primary]="false" label="Draft" size="large" [darkMode]="false"></storybook-button>
        <storybook-button [primary]="true" label="Resubmit" size="large"></storybook-button>
      </div>
    `,
  }),
};

export const ButtonPairDark: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; padding: 20px; background: #1F2937; border-radius: 8px;">
        <storybook-button [primary]="false" label="Draft" size="large" [darkMode]="true"></storybook-button>
        <storybook-button [primary]="true" label="Resubmit" size="large"></storybook-button>
      </div>
    `,
  }),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1F2937' }],
    },
  },
};

export const DesignGuidelines: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DesignDocsComponent],
    },
    template: `
      <flywheel-design-docs
        title="Labeling"
        overview="Keep button content sentence case and concise. Only capitalize the first letter of the CTA and the first letter of a proper noun, like Atlas, Data Lake, Ops Manager, etc."
        [guidelines]="guidelines"
      ></flywheel-design-docs>
    `,
    props: {
      guidelines: {
        visualExamples: [
          {
            doLabel: 'Create a new backup',
            doDescription: 'Use sentence-case capitalization.',
            dontLabel: 'Create A New Backup',
            dontDescription: 'Do not use title case capitalization or all caps.',
          },
          {
            doLabel: 'Explore Data Lake',
            doDescription: 'The proper noun of "Data Lake" is capitalized.',
            dontLabel: 'Explore data lake',
            dontDescription: '"Data Lake" is a name of a product, so should be capitalized.',
          },
        ],
        dos: [
          { description: 'Use primary buttons for the main call-to-action' },
          { description: 'Pair primary + secondary buttons for action groups (Cancel/Submit)' },
          { description: 'Use clear, action-oriented labels (Save, Delete, Submit)' },
          { description: 'Set darkMode="true" when placing buttons on dark backgrounds' },
        ],
        donts: [
          { description: 'Don\'t use multiple primary buttons in the same view' },
          { description: 'Don\'t use vague labels like "Click Here" or "OK"' },
          { description: 'Don\'t mix button sizes in the same button group' },
          { description: 'Don\'t use light secondary buttons on dark backgrounds (use darkMode)' },
        ],
        usageTips: [
          'Place primary action buttons on the right side of button groups',
          'Use large buttons for touch targets on mobile interfaces',
          'Consider adding loading states for async operations',
          'Test color contrast ratios for accessibility compliance',
        ],
      },
    },
  }),
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
};


