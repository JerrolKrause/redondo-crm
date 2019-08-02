import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { leads } from 'src/app/routes/home/routes/root/leads';
import { TableColumnDefinition } from 'src/app/components/ui-lib/table/table';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Global state
// import { DomainService } from '$domain';
// import { UiStateService } from '$ui';
// import { SettingsService } from 'src/app/shared/state/settings';

// Route State
// import { RouteUiStateService } from '../../shared/state/ui';
// import { RouteDomainStateService } from '../../shared/state/domain';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorrowerComponent implements OnInit, OnDestroy {
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
  // private uiState: UiStateService,
  constructor(
    // private domainState: DomainService, // Global domain state
    // public uiState: UiStateService, // Global UI state
    // private routeDomainState: RouteDomainStateService, // Route only domain state
    // private routeUIState: RouteUiStateService, // Route only UI state
    // private settings: SettingsService, // App settings/global properties
  ) {}

  ngOnInit() {
  
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
