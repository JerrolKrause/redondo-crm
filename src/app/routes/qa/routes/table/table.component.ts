import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { leads } from './leads';

@Component({
  selector: 'nts-table-qa',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public rows = leads;
  public columns: NtsTable.Column[] = [
    { label: 'Created', prop: 'created', type: 'date' },
    { label: 'Status', prop: 'status' },
    { label: 'Name', prop: 'name' },
    { label: 'State', prop: 'state' },
    { label: 'Loan Amount', prop: 'loanAmt', type: 'currency' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email' },
    { label: 'Action', prop: 'action' },
  ];

  public filterTerm: string | number | undefined;

  constructor() {}

  ngOnInit() {}
}
