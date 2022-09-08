import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';

@NgModule({
  declarations: [PageWrapperComponent, StatisticComponent, FilePickerComponent],
  imports: [CommonModule],
  exports: [PageWrapperComponent, StatisticComponent, FilePickerComponent],
})
export class AdminSellerSharedModule {}
