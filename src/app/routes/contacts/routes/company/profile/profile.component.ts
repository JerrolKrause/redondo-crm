import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { leads } from 'src/app/routes/home/routes/root/leads';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public leads = leads;
  public columnsLeads: NtsTable.Column[] = [
    { label: 'Created', prop: 'created', type: 'date' },
    { label: 'Date???', prop: 'created2', type: 'date' },
    { label: 'Status', prop: 'status' },
    { label: 'Name', prop: 'name' },
    { label: 'State', prop: 'state' },
    { label: 'Loan Amount', prop: 'loanAmt', type: 'currency' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email' },
    { label: 'Servicing Status', prop: 'servicing' },
    { label: 'Action', prop: 'action' },
  ];
  constructor() {}

  ngOnInit() {}
}
