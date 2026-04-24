import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'success', 'warning', 'error', 'muted'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    icon: {
      control: 'select',
      options: [null, 'diagnostic', 'reader', 'check', 'clock'],
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1F2937' }],
    },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const DiagnosticTab: Story = {
  args: {
    label: 'Diagnostic',
    variant: 'primary',
    icon: 'diagnostic',
  },
};

export const ReaderStudiesTab: Story = {
  args: {
    label: 'Reader Studies',
    variant: 'muted',
    icon: 'reader',
    clickable: true,
  },
};

export const AnnotationComplete: Story = {
  args: {
    label: 'Annotation complete',
    variant: 'success',
    icon: 'check',
  },
};

export const Pending: Story = {
  args: {
    label: 'Pending Review',
    variant: 'warning',
    icon: 'clock',
  },
};

export const Error: Story = {
  args: {
    label: 'Incomplete',
    variant: 'error',
  },
};

export const TabGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; padding: 12px; background: #111827; border-radius: 8px;">
        <flywheel-badge label="Diagnostic" variant="primary" icon="diagnostic"></flywheel-badge>
        <flywheel-badge label="Reader Studies" variant="muted" icon="reader" [clickable]="true"></flywheel-badge>
      </div>
    `,
  }),
};

export const StatusBadges: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 20px;">
        <flywheel-badge label="Complete" variant="success" icon="check"></flywheel-badge>
        <flywheel-badge label="In Progress" variant="warning" icon="clock"></flywheel-badge>
        <flywheel-badge label="Not Started" variant="muted"></flywheel-badge>
        <flywheel-badge label="Error" variant="error"></flywheel-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center; padding: 20px;">
        <flywheel-badge label="Small" variant="primary" size="small"></flywheel-badge>
        <flywheel-badge label="Medium" variant="primary" size="medium"></flywheel-badge>
        <flywheel-badge label="Large" variant="primary" size="large"></flywheel-badge>
      </div>
    `,
  }),
};
