import type { Meta, StoryObj } from '@storybook/angular';
import { CalloutComponent } from './callout.component';

const meta: Meta<CalloutComponent> = {
  title: 'Components/Callout',
  component: CalloutComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['info', 'warning', 'error', 'success', 'instruction'],
    },
    showIcon: {
      control: 'boolean',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1F2937' }],
    },
  },
  decorators: [
    (story, context) => {
      if (context.parameters?.['layout'] === 'fullscreen') {
        return story();
      }
      return {
        template: `<div style="width: 500px; padding: 20px;">${story().template || '<flywheel-callout></flywheel-callout>'}</div>`,
        props: story().props,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<CalloutComponent>;

export const AnnotationInstruction: Story = {
  args: {
    variant: 'instruction',
    message: 'Using the contour freehand ROI, annotate the primary tumor. Note, that tool allows you to generate a circle. This is NOT what you are expected to annotate. Please use the freehand sculpting tool to interpolate across slices. To adjust the border of the interpolated ROIs utilize the freehand sculpting tool.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Pro Tip',
    message: 'Use keyboard shortcuts (1, 2, 3) to quickly select annotation options.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Unsaved Changes',
    message: 'You have annotations that have not been saved. Save your work before navigating away.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Annotation Required',
    message: 'Please complete all required fields before proceeding to the next case.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Annotation Complete',
    message: 'All cases in this study have been reviewed and submitted successfully.',
  },
};

export const NoIcon: Story = {
  args: {
    variant: 'info',
    message: 'A simple informational message without an icon.',
    showIcon: false,
  },
};

export const LongContent: Story = {
  args: {
    variant: 'instruction',
    title: 'RECIST Guidelines',
    message: 'When measuring target lesions, measure the longest diameter for non-nodal lesions and the short axis for lymph nodes. A minimum of 10mm is required for measurable disease. Sum the diameters of all target lesions (maximum 5 total, 2 per organ) to calculate the sum of diameters (SOD).',
  },
};

export const DesignGuidelines: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => ({
    template: `
      <div style="font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 2rem; box-sizing: border-box; width: 100%; background: #ffffff; min-height: 100vh;">

        <!-- Title -->
        <h1 style="font-size: 1.75rem; font-weight: 700; color: #1e293b; margin: 0 0 1rem 0;">Callout</h1>

        <!-- Overview -->
        <p style="font-size: 1rem; color: #64748b; line-height: 1.6; margin: 0 0 2.5rem 0;">
          Callouts are used to call out information to users. Although Banners look similar to Callouts, they serve a different use case. Since Callouts cannot be dismissed, they're optimized for long form copy. In general, Callouts are better for highlighting supplemental information in the middle of content whereas Banners may be better for high priority global messages, above or below primary content.
        </p>

        <!-- Anatomy -->
        <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0 0 1rem 0;">Anatomy</h2>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; margin-bottom: 1.25rem;">
          <flywheel-callout
            variant="info"
            title="Applies to Atlas Device Sync"
            message="This configuration option only applies to apps using Atlas Device Sync. For more information on using Device Sync with the Kotlin SDK, refer to Add Device Sync to an App - Kotlin SDK.">
          </flywheel-callout>
        </div>
        <ol style="color: #64748b; font-size: 0.9375rem; line-height: 2; padding-left: 1.5rem; margin: 0 0 2.5rem 0;">
          <li><strong style="color: #1e293b;">Icon / variant:</strong> the variant type is limited to the component's defined set and should not be customized</li>
          <li><strong style="color: #1e293b;">Title (optional):</strong> a short overview of the content</li>
          <li><strong style="color: #1e293b;">Description:</strong> text that gives users more context to the topic at hand</li>
        </ol>

        <!-- Basic Usage -->
        <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0 0 1rem 0;">Basic usage</h2>

        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.375rem;">
          <span style="width: 20px; height: 20px; border-radius: 50%; background: #10B981; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0;">✓</span>
          <strong style="color: #1e293b; font-size: 0.9375rem;">Do</strong>
        </div>
        <ul style="color: #64748b; font-size: 0.9375rem; line-height: 1.8; margin: 0 0 1rem 1.75rem; padding: 0;">
          <li>Use Callouts for a long-form copy.</li>
          <li>Use Callouts to highlight supplemental information in the middle of content.</li>
        </ul>

        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.375rem;">
          <span style="width: 20px; height: 20px; border-radius: 50%; background: #EF4444; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0;">✕</span>
          <strong style="color: #1e293b; font-size: 0.9375rem;">Don't</strong>
        </div>
        <ul style="color: #64748b; font-size: 0.9375rem; line-height: 1.8; margin: 0 0 2rem 1.75rem; padding: 0;">
          <li>Avoid using Callouts to communicate high-priority, global messages across the entire page. Use our Banners instead.</li>
        </ul>

        <p style="font-size: 0.9375rem; color: #64748b; margin: 0 0 0.75rem 0;">Note callouts show something that "may be nice to know".</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; margin-bottom: 1.5rem;">
          <flywheel-callout
            variant="info"
            message="You can also create API keys that applications use to connect to your Flywheel application. While these are not associated with a single user, they are listed in the Users tab. To learn more about API keys, see API Key Authentication.">
          </flywheel-callout>
        </div>

        <p style="font-size: 0.9375rem; color: #64748b; margin: 0 0 0.75rem 0;">Important callouts show something that "may be important" so the reader should pay attention.</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; margin-bottom: 2.5rem;">
          <flywheel-callout
            variant="warning"
            message="bsondump is a diagnostic tool for inspecting BSON files, not a tool for data ingestion or other application use.">
          </flywheel-callout>
        </div>

        <!-- Header -->
        <h2 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0 0 0.5rem 0;">Header</h2>
        <p style="font-size: 0.9375rem; color: #64748b; margin: 0 0 1.5rem 0;">Do not modify the header of the callout, instead try to opt for a title within the callout.</p>

        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 12fr)); gap: 1.5rem; margin-bottom: 3rem;">

          <!-- Do card -->
          <div style="border-radius: 12px; overflow: hidden; background: #f8fafc; border: 1px solid #e2e8f0;">
            <div style="padding: 2rem;">
              <flywheel-callout
                variant="warning"
                title="Your cluster is not secure"
                message="Before binding to a non-localhost (e.g. publicly accessible) IP address, ensure you have secured your cluster from unauthorized access. For a complete list of security recommendations, see Security Checklist.">
              </flywheel-callout>
            </div>
            <div style="padding: 1rem 1.25rem 1.25rem; border-bottom: 4px solid #10B981;">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9375rem; color: #10B981; margin-bottom: 0.375rem;">
                <span style="width: 18px; height: 18px; border-radius: 50%; background: #10B981; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700;">✓</span>
                Do
              </div>
              <p style="font-size: 0.875rem; color: #64748b; margin: 0; line-height: 1.5;">The header of the callout isn't changed and has title within the callout.</p>
            </div>
          </div>

          <!-- Don't card -->
          <div style="border-radius: 12px; overflow: hidden; background: #f8fafc; border: 1px solid #e2e8f0;">
            <div style="padding: 2rem;">
              <flywheel-callout
                variant="warning"
                message="YOUR CLUSTER IS NOT SECURE — Before binding to a non-localhost (e.g. publicly accessible) IP address, ensure you have secured your cluster from unauthorized access. For a complete list of security recommendations, see Security Checklist.">
              </flywheel-callout>
            </div>
            <div style="padding: 1rem 1.25rem 1.25rem; border-bottom: 4px solid #EF4444;">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9375rem; color: #EF4444; margin-bottom: 0.375rem;">
                <span style="width: 18px; height: 18px; border-radius: 50%; background: #EF4444; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700;">✕</span>
                Don't
              </div>
              <p style="font-size: 0.875rem; color: #64748b; margin: 0; line-height: 1.5;">The header of the callout is modified.</p>
            </div>
          </div>

        </div>
      </div>
    `,
  }),
};
