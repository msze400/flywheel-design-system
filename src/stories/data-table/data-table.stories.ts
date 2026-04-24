import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DataTableContainerComponent } from './data-table-container.component';
import { DataTablePresentationComponent } from './data-table-presentation.component';
import { DataTableColumn, DataTableRow } from './data-table.types';

const SAMPLE_COLUMNS: DataTableColumn[] = [
  { key: 'timestamp', label: 'Timestamp', sortable: true },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'project', label: 'All Projects', sortable: true },
];

const SAMPLE_ROWS: DataTableRow[] = [
  { id: 1, timestamp: '2020-04-08 00:25', subject: '580-17-8691', project: 'Radiation Thera...' },
  { id: 2, timestamp: '2020-04-05 10:31', subject: '255-56-3053', project: 'Radiation Thera...' },
  { id: 3, timestamp: '2020-04-05 04:19', subject: '02', project: 'Epilepsy' },
  { id: 4, timestamp: '2020-03-22 18:25', subject: '459-45-0279', project: 'Radiation Thera...' },
  { id: 5, timestamp: '2020-03-20 10:37', subject: '792-48-6506', project: 'Radiation Thera...' },
  { id: 6, timestamp: '2020-03-10 01:34', subject: '068-86-2293', project: 'Radiation Thera...' },
  { id: 7, timestamp: '2020-03-06 20:21', subject: '02', project: 'Epilepsy' },
  { id: 8, timestamp: '2020-03-06 00:54', subject: '473-50-0141', project: 'Radiation Thera...' },
  { id: 9, timestamp: '2020-02-27 18:57', subject: '142-95-4435', project: 'Radiation Thera...' },
  { id: 10, timestamp: '2020-02-25 16:29', subject: '02', project: 'Epilepsy' },
  { id: 11, timestamp: '2020-02-21 02:54', subject: '344-39-2924', project: 'Radiation Thera...' },
  { id: 12, timestamp: '2020-02-20 01:25', subject: '02', project: 'Stroke' },
  { id: 13, timestamp: '2020-02-17 13:21', subject: '119-93-4428', project: 'Radiation Thera...' },
  { id: 14, timestamp: '2020-02-16 17:51', subject: '511-80-0130', project: 'Radiation Thera...' },
  { id: 15, timestamp: '2020-02-13 14:39', subject: '428-13-3146', project: 'Radiation Thera...' },
  { id: 16, timestamp: '2020-01-28 05:42', subject: '02', project: 'Stroke' },
  { id: 17, timestamp: '2020-01-27 07:28', subject: '02', project: 'Epilepsy' },
  { id: 18, timestamp: '2020-01-22 12:55', subject: '02', project: 'Stroke' },
  { id: 19, timestamp: '2020-01-10 04:21', subject: '513-14-8052', project: 'Radiation Thera...' },
];

const meta: Meta<DataTablePresentationComponent> = {
  title: 'Components/DataTable',
  component: DataTablePresentationComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DataTableContainerComponent, DataTablePresentationComponent],
    }),
  ],
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    config: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<DataTablePresentationComponent>;

export const Default: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_ROWS,
    config: { canSelect: true, canSort: true, canFilter: false, defaultPageSize: 20 },
  },
};

export const EmptyState: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: [],
    config: { canSelect: true, canSort: true, canFilter: false },
  },
};

export const FewRows: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_ROWS.slice(0, 5),
    config: { canSelect: true, canSort: true, canFilter: false },
  },
};

export const WithFilters: Story = {
  args: {
    columns: SAMPLE_COLUMNS.map(c => ({ ...c, filterable: true })),
    data: SAMPLE_ROWS,
    config: { canSelect: true, canSort: true, canFilter: true, defaultPageSize: 10 },
  },
};

export const WithCustomCellTemplate: Story = {
  render: () => ({
    props: {
      columns: SAMPLE_COLUMNS,
      data: SAMPLE_ROWS.slice(0, 8),
      config: { canSelect: true, canSort: true, canFilter: false },
      isLoading: false,
    },
    template: `
      <flywheel-data-table
        [columns]="columns"
        [data]="data"
        [config]="config"
        [isLoading]="isLoading"
      >
        <ng-template flywheelCellDef="subject" let-value let-row="row">
          <span style="font-weight: 700; color: #0F172A;">{{ value }}</span>
          <span style="margin-left: 8px; font-size: 11px; color: #6B7280;">#{{ row.id }}</span>
        </ng-template>
      </flywheel-data-table>
    `,
  }),
};

export const ContainerWithDataSource: Story = {
  render: () => ({
    props: {
      columns: SAMPLE_COLUMNS,
      dataSource: SAMPLE_ROWS,
      config: { canSelect: true, canSort: true, canFilter: true, defaultPageSize: 10 },
    },
    template: `
      <flywheel-data-table-container
        [columns]="columns"
        [dataSource]="dataSource"
        [config]="config">
      </flywheel-data-table-container>
    `,
  }),
};
