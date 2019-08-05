import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableColumnDefinition } from 'src/app/components/ui-lib/table/table';
import { leads } from './leads';

@Component({
  selector: 'app-table-qa',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public leads = leads;
  public columnsLeads: TableColumnDefinition[] = [
    { label: 'Created', prop: 'created', type: 'date' },
    { label: 'Status', prop: 'status' },
    { label: 'Name', prop: 'name' },
    { label: 'State', prop: 'state' },
    { label: 'Loan Amount', prop: 'loanAmt', type: 'currency' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email' },
    { label: 'Action', prop: 'action' },
  ];

  public columnsLeadsMobile: TableColumnDefinition[] = [
    { label: 'Created', prop: 'created', type: 'date' },
    { label: 'Status', prop: 'status' },
    { label: 'State', prop: 'state' },
    { label: 'Loan Amount', prop: 'loanAmt', type: 'currency' },
    { label: 'Name', prop: 'name' },
    { label: 'Phone', prop: 'phone', type: 'phoneNumber' },
    { label: 'Email', prop: 'email', type: 'email' },
    { label: 'Action', prop: 'action' },
  ];

  constructor() {}

  ngOnInit() {}
}
