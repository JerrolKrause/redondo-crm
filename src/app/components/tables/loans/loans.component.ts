import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-loans-table',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansTableComponent implements OnInit {
  @Input() rows: any[] = [];
  @Input() columns: string[] = [
    'created',
    'status',
    'loanNumber',
    'name',
    'phone',
    'email',
    'address',
    'loanType',
    'loanAmt',
    'condition',
    'milestone',
    'linked',
  ];

  public dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.sort = this.sort;
  }
}
