import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { leads } from './leads';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { TableColumnDefinition } from 'src/app/components/ui-lib/table/table';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Global state
// import { DomainService } from '$domain';
// import { UiStateService } from '$ui';
// import { SettingsService } from 'src/app/shared/state/settings';

// Route State
// import { RouteUiStateService } from '../../shared/state/ui';
// import { RouteDomainStateService } from '../../shared/state/domain';
const today = new Date();

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {
  public leads = leads;
  public columnsLeads: TableColumnDefinition[] = [
    { label: 'Created', prop: 'created', type: 'date' },
    { label: 'Status', prop: 'status' },
    { label: 'Name', prop: 'name' },
    { label: 'State', prop: 'state' },
    { label: 'Loan Amount', prop: 'loanAmt', type: 'currency' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email'  },
    { label: 'Action', prop: 'action' },
  ];

  public columnsLeadsMobile: TableColumnDefinition[] = [
    { label: 'Created', prop: 'created', type: 'date' },
    { label: 'Status', prop: 'status' },
    { label: 'State', prop: 'state' },
    { label: 'Loan Amount', prop: 'loanAmt', type: 'currency' },
    { label: 'Name', prop: 'name' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email' },
    { label: 'Action', prop: 'action' },
  ];

  public dataPoints: CanvasJS.ChartDataSeriesOptions[] = [
    {
      dataPoints: [
        {
          label: ' ',
          y: 11,
        },
        {
          label: ' ',
          y: 6,
        },
        {
          label: ' ',
          y: 23,
        },
        {
          label: ' ',
          y: 16,
        },
      ],
    },
  ];
  public dataPointsVolume: CanvasJS.ChartDataSeriesOptions[] = [
    {
      dataPoints: [
        {
          label: ' ',
          y: 33,
        },
        {
          label: ' ',
          y: 36,
        },
        {
          label: ' ',
          y: 29,
        },
        {
          label: ' ',
          y: 45,
        },
      ],
    },
  ];

  public dataPointsTalk: CanvasJS.ChartDataSeriesOptions[] = [
    {
      dataPoints: [
        {
          label: ' ',
          y: 6,
        },
        {
          label: ' ',
          y: 9,
        },
        {
          label: ' ',
          y: 7,
        },
        {
          label: ' ',
          y: 11,
        },
        {
          label: ' ',
          y: 18,
        },
        {
          label: ' ',
          y: 16,
        },
        {
          label: ' ',
          y: 22,
        },
      ],
    },
  ];

  public view = CalendarView.Day;
  public CalendarView = CalendarView;
  public events: CalendarEvent[] = [
    {
      title: 'Call George back',
      start: <any>today.setHours(today.getHours() + 1),
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      title: 'Request docs from Suzi',
      start: <any>today.setHours(today.getHours() - 2),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
    },
  ];

  constructor() {}
  // private domainState: DomainService, // Global domain state
  // public uiState: UiStateService, // Global UI state
  // private routeDomainState: RouteDomainStateService, // Route only domain state
  // private routeUIState: RouteUiStateService, // Route only UI state
  // private settings: SettingsService, // App settings/global properties

  ngOnInit() {}

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
