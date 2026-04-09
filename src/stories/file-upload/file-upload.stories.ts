import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Components/FileUpload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text displayed in the upload area',
    },
    description: {
      control: 'text',
      description: 'Description text with file format hints',
    },
    buttonLabel: {
      control: 'text',
      description: 'Label for the upload button',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the upload component',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Component size variant',
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

/**
 * Default file upload component for medical imaging files.
 */
export const Default: Story = {
  args: {
    title: 'Upload Medical Images',
    description: 'Drag and drop DICOM, PNG, or JPEG files here',
    buttonLabel: 'Browse Files',
    accept: '.dcm,.dicom,.png,.jpg,.jpeg',
    multiple: true,
    disabled: false,
    size: 'medium',
  },
};

/**
 * Small variant for compact layouts.
 */
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    title: 'Upload Files',
    description: 'Drop files here',
  },
};

/**
 * Large variant for prominent upload areas.
 */
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    title: 'Upload DICOM Studies',
    description: 'Drag and drop entire study folders or individual DICOM files',
  },
};

/**
 * Single file upload mode.
 */
export const SingleFile: Story = {
  args: {
    ...Default.args,
    multiple: false,
    title: 'Upload Patient Photo',
    description: 'Select a single image file',
    accept: '.png,.jpg,.jpeg',
  },
};

/**
 * DICOM-only upload for radiology workflows.
 */
export const DICOMOnly: Story = {
  args: {
    ...Default.args,
    title: 'Upload DICOM Files',
    description: 'Only DICOM format files are accepted',
    accept: '.dcm,.dicom',
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
