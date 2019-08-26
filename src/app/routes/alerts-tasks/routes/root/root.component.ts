import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { leads } from 'src/app/routes/home/routes/root/leads';
import { BehaviorSubject } from 'rxjs';
// import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {
  public filter1 = 'today';
  public tasksDue = {
    overdue: true,
    today: true,
    week: false,
  };

  public tasksAll = {
    open: true,
    all: true,
    completed: false,
  };

  public leads$ = new BehaviorSubject([...leads, ...leads, ...leads]).pipe(
    // map(leads => this.tasksDue ? leads : leads),
    // map(leads => leads.filter(() => (Math.floor(Math.random() * 10) > 3 ? true : false))),
  );

  public columns: NtsTable.Column[] = [
    { label: '', prop: 'created2' },
    { label: 'Alert Type', prop: 'alertType' },
    { label: 'Due Date', prop: 'created', type: 'date' },
    { label: 'Name', prop: 'name' },
    { label: 'Description', prop: 'description' },
    { label: 'Actions', prop: 'action' },
  ];

  // private uiState: UiStateService,
  constructor() {}

  ngOnInit() {}


  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
