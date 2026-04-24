import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

@Component({
  selector: 'flywheel-file-upload',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div
      class="flywheel-file-upload"
      [ngClass]="classes"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <input
        type="file"
        #fileInput
        [accept]="accept"
        [multiple]="multiple"
        (change)="onFileSelected($event)"
        class="flywheel-file-upload__input"
      />
      <div class="flywheel-file-upload__content">
        <div class="flywheel-file-upload__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p class="flywheel-file-upload__title">{{ title }}</p>
        <p class="flywheel-file-upload__description">{{ description }}</p>
        <storybook-button
          [primary]="true"
          [label]="buttonLabel"
          size="medium"
          (onClick)="fileInput.click()"
        ></storybook-button>
      </div>
      <div *ngIf="files.length > 0" class="flywheel-file-upload__file-list">
        <div *ngFor="let file of files" class="flywheel-file-upload__file-item">
          <span class="flywheel-file-upload__file-name">{{ file.name }}</span>
          <span class="flywheel-file-upload__file-size">{{ formatFileSize(file.size) }}</span>
          <storybook-button
            [primary]="false"
            size="small"
            label="✕"
            (onClick)="removeFile(file)"
          ></storybook-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./file-upload.css'],
})
export class FileUploadComponent {
  /** Title text displayed in the upload area */
  @Input()
  title = 'Upload Medical Images';

  /** Description text with file format hints */
  @Input()
  description = 'Drag and drop DICOM, PNG, or JPEG files here';

  /** Label for the upload button */
  @Input()
  buttonLabel = 'Browse Files';

  /** Accepted file types (e.g., ".dcm,.png,.jpg") */
  @Input()
  accept = '.dcm,.dicom,.png,.jpg,.jpeg';

  /** Allow multiple file selection */
  @Input()
  multiple = true;

  /** Disable the upload component */
  @Input()
  disabled = false;

  /** Component size variant */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /** Emits when files are selected or dropped */
  @Output()
  filesSelected = new EventEmitter<UploadedFile[]>();

  /** Emits when a file is removed */
  @Output()
  fileRemoved = new EventEmitter<UploadedFile>();

  files: UploadedFile[] = [];
  isDragging = false;

  public get classes(): string[] {
    return [
      `flywheel-file-upload--${this.size}`,
      this.isDragging ? 'flywheel-file-upload--dragging' : '',
      this.disabled ? 'flywheel-file-upload--disabled' : '',
    ].filter(Boolean);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.isDragging = true;
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (this.disabled || !event.dataTransfer?.files) return;

    this.handleFiles(event.dataTransfer.files);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(fileList: FileList): void {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

    if (this.multiple) {
      this.files = [...this.files, ...newFiles];
    } else {
      this.files = newFiles.slice(0, 1);
    }

    this.filesSelected.emit(this.files);
  }

  removeFile(file: UploadedFile): void {
    this.files = this.files.filter((f) => f !== file);
    this.fileRemoved.emit(file);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
