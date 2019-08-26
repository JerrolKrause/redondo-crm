import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Route State
import { BehaviorSubject } from 'rxjs';
import { leads } from 'src/app/routes/home/routes/root/leads';
// import { RouteDomainStateService } from '../../shared/state/domain';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {
  public leads$ = new BehaviorSubject([...leads, ...leads, ...leads])
    .pipe
    // map(leads => this.tasksDue ? leads : leads),
    // map(leads => leads.filter(() => (Math.floor(Math.random() * 10) > 3 ? true : false))),
    ();

  public columns: NtsTable.Column[] = [
    { label: 'Date Added', prop: 'created', type: 'date' },
    { label: 'Name', prop: 'name' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email' },
    { label: 'Status', prop: 'status' },
    { label: 'Contacts', prop: 'condition' },
    { label: 'Last Note', prop: 'description' },
    { label: 'Action', prop: 'action' },
  ];
  // private uiState: UiStateService,
  constructor() {}

  ngOnInit() {}

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
