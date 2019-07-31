import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule as CalModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule,
    CalModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })],
  exports: [CalendarComponent],
})
export class CalendarModule {}
