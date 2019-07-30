import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { leads } from './leads';
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
  public columnsLoans: string[] = ['created', 'status', 'name', 'state', 'loanAmt', 'phone', 'email', 'address', 'loanType', 'condition', 'milestone', 'linked'];
  public dataSource = new MatTableDataSource(leads);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor() {}
  // private domainState: DomainService, // Global domain state
  // public uiState: UiStateService, // Global UI state
  // private routeDomainState: RouteDomainStateService, // Route only domain state
  // private routeUIState: RouteUiStateService, // Route only UI state
  // private settings: SettingsService, // App settings/global properties
  

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
