import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';

import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';

@NgModule({
  declarations: [PageWrapperComponent, StatisticComponent, FilePickerComponent],
  imports: [SharedModule],
  exports: [
    SharedModule,
    PageWrapperComponent,
    StatisticComponent,
    FilePickerComponent,
  ],
})
export class AdminSellerSharedModule {}
