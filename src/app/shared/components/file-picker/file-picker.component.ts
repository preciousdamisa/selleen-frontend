import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent {
  @Input() label = '';
  @Input() classes = '';
  @Input() multiple = false;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() filesSelected = new EventEmitter<FileList>();

  onSelectFile(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    if (this.multiple) this.filesSelected.emit(inputEl.files!);
    else this.fileSelected.emit(inputEl.files![0]);
  }
}
