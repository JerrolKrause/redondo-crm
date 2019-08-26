import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { leads } from 'src/app/routes/home/routes/root/leads';
// import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {

  public toggle: any = {
    all: true
  };
 
  public leads$ = new BehaviorSubject([...leads, ...leads, ...leads]).pipe(
    // map(leads => this.tasksDue ? leads : leads),
    // map(leads => leads.filter(() => (Math.floor(Math.random() * 10) > 3 ? true : false))),
  );

  public columns: NtsTable.Column[] = [
    { label: '', prop: 'created2' },
    { label: 'Type', prop: 'alertType' },
    { label: 'Name', prop: 'name' },
    { label: 'User', prop: 'name2' },
    { label: 'Email', prop: 'email', type: 'email' },
   
    { label: 'Phone Number', prop: 'phone', type: 'phoneNumber' },
    { label: 'Status', prop: 'status' },
    { label: 'Actions', prop: 'action' },
  ];
  // private uiState: UiStateService,
  constructor(
   
  ) {}

  ngOnInit() {
    
  }


  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
