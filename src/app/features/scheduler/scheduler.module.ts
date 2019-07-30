import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler.component';

import {
  ScheduleModule
} from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [SchedulerComponent],
  imports: [CommonModule, ScheduleModule],
  exports: [SchedulerComponent],
})
export class SchedulerModule {}
