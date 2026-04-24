import type { Meta, StoryObj } from '@storybook/angular';
import { DesignDocsComponent } from './design-docs.component';

const meta: Meta<DesignDocsComponent> = {
  title: 'Foundation/Design Documentation',
  component: DesignDocsComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<DesignDocsComponent>;

export const ButtonLabeling: Story = {
  render: () => ({
    template: `
      <div style="min-height:100vh; width:100vw; box-sizing:border-box; background:#ffffff; padding: 40px 48px;">
        <flywheel-design-docs
          title="Labeling"
          overview="Keep button content sentence case and concise. Only capitalize the first letter of the CTA and the first letter of a proper noun, like Atlas, Data Lake, Ops Manager, etc."
          [guidelines]="guidelines"
        ></flywheel-design-docs>
      </div>
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
        dos: [],
        donts: [],
      },
    },
  }),
};

export const Template: Story = {
  args: {
    title: 'Component Name Guidelines',
    overview: 'Add a brief description of what this component is used for and when to use it.',
    guidelines: {
      dos: [
        { description: 'Add your do guidelines here' },
        { description: 'Include code examples when helpful', example: '<component prop="value">' },
      ],
      donts: [
        { description: 'Add your don\'t guidelines here' },
        { description: 'Explain why certain patterns should be avoided' },
      ],
      usageTips: [
        'Add helpful tips for using this component',
        'Include accessibility considerations',
      ],
    },
  },
};

export const RadioGroupExample: Story = {
  args: {
    title: 'RadioGroup Guidelines',
    overview: 'RadioGroups are used for mutually exclusive selections where users must choose exactly one option from a set.',
    guidelines: {
      dos: [
        { description: 'Use for 2-5 mutually exclusive options' },
        { description: 'Provide clear, concise labels for each option' },
        { description: 'Pre-select a default option when appropriate' },
        { description: 'Use vertical layout for more than 3 options' },
        { description: 'Group related questions logically' },
      ],
      donts: [
        { description: 'Don\'t use for single yes/no toggles (use a checkbox instead)' },
        { description: 'Don\'t use for more than 7 options (use a dropdown instead)' },
        { description: 'Don\'t change radio options dynamically based on other selections' },
        { description: 'Don\'t use identical or ambiguous option labels' },
      ],
      usageTips: [
        'Ensure radio groups are keyboard navigable (arrow keys)',
        'Provide clear error states for required but unanswered questions',
        'Consider adding "Uncertain" or "N/A" options for medical annotations',
      ],
    },
  },
};

export const ProgressBarExample: Story = {
  args: {
    title: 'ProgressBar Guidelines',
    overview: 'Progress bars communicate status and completion of workflows, helping users understand where they are in a multi-step process.',
    guidelines: {
      dos: [
        { description: 'Show fraction (1/5) for discrete steps, percentage for continuous progress' },
        { description: 'Use success variant (green) when 100% complete' },
        { description: 'Include descriptive labels that explain what is being measured' },
        { description: 'Update progress in real-time when possible' },
      ],
      donts: [
        { description: 'Don\'t show progress bars for indeterminate operations (use spinners)' },
        { description: 'Don\'t let progress appear to go backwards' },
        { description: 'Don\'t use progress bars for single-step actions' },
        { description: 'Don\'t hide progress indication during long operations' },
      ],
      usageTips: [
        'Combine with time estimates for better user expectations',
        'Use warning/error variants to indicate issues with the workflow',
        'Consider showing sub-progress for complex multi-stage operations',
      ],
    },
  },
};
