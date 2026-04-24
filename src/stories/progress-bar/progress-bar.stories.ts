import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Components/ProgressBar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'warning', 'error'],
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1F2937' }],
    },
  },
  decorators: [
    (story) => ({
      template: `<div style="width: 300px; padding: 20px;">${story().template || '<flywheel-progress-bar></flywheel-progress-bar>'}</div>`,
      props: story().props,
    }),
  ],
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const AnnotationProgress: Story = {
  args: {
    current: 0,
    total: 3,
    label: 'Progress',
    suffix: 'completed',
    showFraction: true,
  },
};

export const PartiallyComplete: Story = {
  args: {
    current: 1,
    total: 3,
    label: 'Progress',
    suffix: 'completed',
    showFraction: true,
  },
};

export const Complete: Story = {
  args: {
    current: 3,
    total: 3,
    label: 'Progress',
    suffix: 'completed',
    showFraction: true,
  },
};

export const Percentage: Story = {
  args: {
    current: 67,
    total: 100,
    label: 'Cases Reviewed',
    showFraction: false,
  },
};

export const Small: Story = {
  args: {
    current: 2,
    total: 5,
    label: 'Progress',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    current: 4,
    total: 10,
    label: 'Study Progress',
    size: 'large',
  },
};

export const NoLabel: Story = {
  args: {
    current: 3,
    total: 10,
    showLabel: false,
  },
};

export const Warning: Story = {
  args: {
    current: 8,
    total: 10,
    label: 'Storage Used',
    variant: 'warning',
    showFraction: false,
  },
};

export const Error: Story = {
  args: {
    current: 95,
    total: 100,
    label: 'Quota Exceeded',
    variant: 'error',
    showFraction: false,
  },
};
