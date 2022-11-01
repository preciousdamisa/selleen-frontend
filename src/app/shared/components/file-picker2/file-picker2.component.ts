import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-picker2',
  templateUrl: './file-picker2.component.html',
  styleUrls: ['./file-picker2.component.scss'],
})
export class FilePicker2Component {
  @Input() label = '';
  @Input() classes = '';
  @Input() multiple = false;
  @Input() accept = 'image/x-png,image/jpeg,application/pdf';
  @Input() showPDFIcon = false;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() filesSelected = new EventEmitter<FileList>();

  onSelectFile(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    if (this.multiple) this.filesSelected.emit(inputEl.files!);
    else this.fileSelected.emit(inputEl.files![0]);
  }
}
