import { NgModule } from '@angular/core';

import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { StatisticComponent } from './components/statistic/statistic.component';

@NgModule({
  declarations: [PageWrapperComponent, StatisticComponent],
  exports: [PageWrapperComponent, StatisticComponent],
})
export class AdminSellerSharedModule {}
