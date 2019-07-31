import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { leads } from './leads';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Global state
// import { DomainService } from '$domain';
// import { UiStateService } from '$ui';
// import { SettingsService } from 'src/app/shared/state/settings';

// Route State
// import { RouteUiStateService } from '../../shared/state/ui';
// import { RouteDomainStateService } from '../../shared/state/domain';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {
  public columnsLeads: string[] = ['created', 'status', 'name', 'state', 'loanAmt', 'phone', 'email'];
  public columnsLoans: string[] = [
    'created',
    'status',
    'loanNumber',
    'name',
    'phone',
    'email',
    'address',
    'loanType',
    'loanAmt',

    'condition',
    'milestone',
    'linked',
  ];
  public dataSource = new MatTableDataSource(leads);
  public dataSourceLoans = new MatTableDataSource(leads);
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

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort2!: MatSort;

  public view = CalendarView.Day;
  public CalendarView = CalendarView;

  public events: CalendarEvent[] = [
    {
      title: 'Call George back',
      start: setHours(setMinutes(new Date(), 0), 3),
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      title: 'Request docs from Suzi',
      start: setHours(setMinutes(new Date(), 0), 5),
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

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSourceLoans.sort = this.sort2;
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
