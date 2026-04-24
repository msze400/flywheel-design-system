import type { Meta, StoryObj } from '@storybook/angular';
import { TokensComponent } from './tokens.component';

const meta: Meta<TokensComponent> = {
  title: 'Foundation/Tokens',
  component: TokensComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<TokensComponent>;

export const Default: Story = {};
