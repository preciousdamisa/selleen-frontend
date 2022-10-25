import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';

import { StatisticComponent } from './components/statistic/statistic.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';

@NgModule({
  declarations: [StatisticComponent, FilePickerComponent],
  imports: [SharedModule],
  exports: [SharedModule, StatisticComponent, FilePickerComponent],
})
export class AdminSellerSharedModule {}
