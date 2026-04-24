import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: { control: 'text' },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    variant: {
      control: 'radio',
      options: ['contained', 'outline'],
    },
    state: {
      control: 'radio',
      options: ['enabled', 'focused', 'pressed', 'disabled'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    valueChange: { action: 'valueChange' },
  },
  args: {
    placeholder: 'Enter additional info',
    size: 'large',
    theme: 'dark',
    variant: 'contained',
    state: 'enabled',
    disabled: false,
    readonly: false,
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {};

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    disabled: true,
  },
};

export const StateMatrix: Story = {
  render: () => ({
    props: {
      rows: ['Enabled', 'Focused', 'Pressed', 'Disabled'],
      states: ['enabled', 'focused', 'pressed', 'disabled'],
      columns: [
        { label: 'Dark', theme: 'dark' },
        { label: 'Light', theme: 'light' },
      ],
    },
    template: `
      <div
        style="
          display:grid;
          grid-template-columns: 120px repeat(2, minmax(260px, 1fr));
          gap:14px;
          align-items:center;
          padding:24px;
          background:#ffffff;
          min-height:100vh;
          box-sizing:border-box;
          font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
        "
      >
        <div></div>
        <div style="display:flex; flex-direction:column; gap:6px; color:#8f5cff; font-size:12px; font-weight:700;">
          <span>Dark</span>
          <span style="display:inline-flex; border-top:2px solid #c6a6ff; border-left:2px solid #c6a6ff; border-right:2px solid #c6a6ff; border-radius:4px 4px 0 0; padding:4px 8px 0; width:max-content;">Contained</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; color:#8f5cff; font-size:12px; font-weight:700;">
          <span>Light</span>
          <span style="display:inline-flex; border-top:2px solid #c6a6ff; border-left:2px solid #c6a6ff; border-right:2px solid #c6a6ff; border-radius:4px 4px 0 0; padding:4px 8px 0; width:max-content;">Contained</span>
        </div>

        <ng-container *ngFor="let row of rows; let index = index">
          <div style="color:#8f5cff; font-size:12px; font-weight:700;">{{ row }}</div>
          <div
            *ngFor="let column of columns"
            style="
              min-height:58px;
              display:flex;
              align-items:center;
              border:1px dashed #c6a6ff;
              border-radius:6px;
              padding:12px;
              box-sizing:border-box;
            "
          >
            <flywheel-input
              [placeholder]="'Enter additional info'"
              size="large"
              variant="contained"
              [theme]="column.theme"
              [state]="states[index]"
              [disabled]="states[index] === 'disabled'"
              ariaLabel="Additional information"
            ></flywheel-input>
          </div>
        </ng-container>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
};
