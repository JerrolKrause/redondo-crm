import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Global state
// import { DomainService } from '$domain';
import { UiStateService } from '$ui';
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
  // private uiState: UiStateService,
  constructor(
    public uiState: UiStateService, // Global UI state
  ) {}

  ngOnInit() {}

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
