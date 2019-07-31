import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [
  '../../../../../../node_modules/angular-calendar/css/angular-calendar.css',
  './calendar.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  @Input() view: CalendarView = CalendarView.Month;
  @Input() viewDate: Date = new Date();
  @Input() events: CalendarEvent[] = [];

  // Day view specific
  @Input() dayStartHour = 7;
  @Input() dayEndHour = 18;
  @Input() hourSegments = 1;

  public CalendarView = CalendarView;
 
  constructor() {}

  ngOnInit() {
    console.log(this);
  }

}
