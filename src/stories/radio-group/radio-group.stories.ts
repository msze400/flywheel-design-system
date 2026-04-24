import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from './radio-group.component';

const meta: Meta<RadioGroupComponent> = {
  title: 'Components/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      control: 'boolean',
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
type Story = StoryObj<RadioGroupComponent>;

export const TumorPresent: Story = {
  args: {
    label: 'Is there a tumor present on this scan?',
    name: 'tumor-present',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'uncertain', label: 'Uncertain' },
    ],
    orientation: 'vertical',
  },
};

export const VentricularZone: Story = {
  args: {
    label: 'Does the tumor involve the ventricular/subventricular zone?',
    name: 'ventricular-zone',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'indeterminate', label: 'Indeterminate' },
    ],
    orientation: 'vertical',
  },
};

export const ViableTumor: Story = {
  args: {
    label: 'Is there any viable (nonenhancing) tumor?',
    name: 'viable-tumor',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'uncertain', label: 'Uncertain' },
    ],
    orientation: 'vertical',
  },
};

export const MassEnhancement: Story = {
  args: {
    label: 'Does the mass show enhancement (FLAIR)?',
    name: 'mass-enhancement',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'partial', label: 'Partial' },
    ],
    orientation: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Quick response needed',
    name: 'quick-response',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    orientation: 'horizontal',
  },
};

export const Disabled: Story = {
  args: {
    label: 'This question is locked',
    name: 'locked-question',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'uncertain', label: 'Uncertain' },
    ],
    disabled: true,
  },
};
