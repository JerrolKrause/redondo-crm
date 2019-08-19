import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Global state
// import { DomainService } from '$domain';
import { UiStateService } from '$ui';
import { leads } from 'src/app/routes/home/routes/root/leads';
import { MatDialog } from '@angular/material';
import { MembersComponent } from '../../components/modals/members/members.component';
// import { SettingsService } from 'src/app/shared/state/settings';

// Route State
// import { RouteUiStateService } from '../../shared/state/ui';
// import { RouteDomainStateService } from '../../shared/state/domain';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit, OnDestroy {
  public leads = [...leads, ...leads, ...leads];
  public columnsLeads: NtsTable.Column[] = [
    { label: 'Channel', prop: 'channel' },
    { label: 'Company', prop: 'company' },
    { label: 'Owner', prop: 'name' },
    { label: 'Title', prop: 'title' },
    { label: 'Type', prop: 'type' },
    { label: 'Address', prop: 'address' },
    { label: 'City', prop: 'city' },
    { label: 'State', prop: 'state' },
    { label: 'Units', prop: 'units' },
    { label: 'Volume', prop: 'volume' },
    { label: 'Active', prop: 'active' },
    { label: 'Members', prop: 'members' },
  ];

  // private uiState: UiStateService,
  constructor(
    public uiState: UiStateService, // Global UI state
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  public modalOpenMembers() {
    this.dialog.open(MembersComponent);
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
