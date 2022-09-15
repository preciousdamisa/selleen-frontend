import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { TabComponent } from './components/tab/tab.component';

@NgModule({
  declarations: [
    PageWrapperComponent,
    StatisticComponent,
    FilePickerComponent,
    TabBarComponent,
    TabComponent,
  ],
  imports: [CommonModule],
  exports: [
    PageWrapperComponent,
    StatisticComponent,
    FilePickerComponent,
    TabBarComponent,
    TabComponent,
  ],
})
export class AdminSellerSharedModule {}
