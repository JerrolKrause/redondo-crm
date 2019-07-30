import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: [
  '../../../../node_modules/@syncfusion/ej2-base/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css', 
  '../../../../node_modules/@syncfusion/ej2-schedule/styles/material.css', 

  './scheduler.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent implements OnInit {
  public selectedDate: Object = new Date();
  public eventSettings: EventSettingsModel = {
    fields: {
      subject: { name: 'subject', validation: { required: true } },
      startTime: { name: 'StartTime', validation: { required: true } },
      endTime: { name: 'EndTime', validation: { required: true } },
    },
  };

  constructor() {}

  ngOnInit() {}

  public onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(args, 'popup');
  }

  public onActionBegin(arg: any): void {
    console.log(arg, 'onActionBegin');
  }

  public onActionComplete(arg: any): void {
    if (arg.requestType === 'eventCreated') {
      // this.schedulerSection.patchValue(this.mapCalendarToEntry(arg.data));
      // this.submitSchedule(false);
    }

    if (arg.requestType === 'eventChanged') {
      // this.schedulerSection.patchValue(this.mapCalendarToEntry(arg.data));
      // this.submitSchedule(true);
    }

    if (arg.requestType === 'eventRemoved') {
      if (arg.data[0].guid) {
        //  this.deleteSchedule(arg.data[0].guid);
      }
    }
  }
}
