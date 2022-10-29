import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  providers: [NgxImageCompressService],
})
export class FilePickerComponent {
  @Input() label = '';
  @Input() classes = '';
  @Input() multiple = false;
  @Input('compress') shouldCompress = false;
  @Input() accept = 'image/x-png,image/jpeg,application/pdf';

  @Output() fileSelected = new EventEmitter<File>();
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() previewUrls = new EventEmitter<string[]>();

  images: File[] = [];
  urls: string[] = [];

  constructor(private imageCompress: NgxImageCompressService) {}

  // onSelectFile(e: Event) {
  //   const inputEl = e.target as HTMLInputElement;

  //   if (this.multiple && this.shouldCompress) {
  //     this.compressImages(inputEl.files!);
  //   } else if (this.multiple) {
  //     const files = this.tranformFileList(inputEl.files!);
  //     this.filesSelected.emit(files);
  //   } else if (!this.multiple) {
  //     this.fileSelected.emit(inputEl.files![0]);
  //   }
  // }

  async compressFile() {
    const files: { image: string; fileName: string; orientation: number }[] =
      await this.imageCompress.uploadMultipleFiles();

    files.forEach(async (file) => {
      const compressedImage = await this.imageCompress.compressFile(
        file.image,
        file.orientation,
        50,
        50
      );

      this.urls.push(compressedImage);
      const f = this.dataURLtoFile(compressedImage, file.fileName);
      this.images.push(f);

      if (this.images.length === files.length) {
        this.filesSelected.emit([...this.images]);
        this.previewUrls.emit([...this.urls]);
        this.images = [];
        this.urls = [];
      }
    });
  }

  dataURLtoFile(dataUrl: string, filename: string) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)!;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime[1] });
  }
}
