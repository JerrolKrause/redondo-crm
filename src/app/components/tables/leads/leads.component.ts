import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-leads-table',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsTableComponent implements OnInit {
  @Input() rows: any[] = [];
  @Input() columns: string[] = ['created', 'status', 'name', 'state', 'loanAmt', 'phone', 'email'];

  public dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.rows);
    this.dataSource.sort = this.sort;
  }
}
