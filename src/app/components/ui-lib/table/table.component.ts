import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  @Input() rows: any[] = [];
  @Input() columns: { label: string; prop: string }[] = [];

  @Input() canSort = true;
  @Input() mobileBreakpoint = 768;

  public dataSource!: MatTableDataSource<any[]>;

  public columnDefinitions: string[] = [];

  public rowsPivot: MatTableDataSource<any[]>[] = [];
  public columnsPivot = [{ label: 'Label', prop: '$$label' }, { label: 'value', prop: 'value' }];
  public columnDefinitionsPivot: string[] = ['$$label', 'value'];

  public isMobile$ = fromEvent(window, 'resize').pipe(
    debounceTime(100),
    map(e => (e && e.target ? (<any>e).target.innerWidth : null)), // Extract window width
    startWith(window.innerWidth),
    map(width => (width <= this.mobileBreakpoint ? true : false)), // If window width is less than mobileBreakpoint return true
    distinctUntilChanged(), // Only update on changes
  );

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.tableInit();
    this.isMobile$.subscribe(res => console.log(res));
    console.log('Rows ', this.rows);

    this.rowsPivot = this.pivotTable(this.rows, this.columns);
    console.log('columnsPivot ', this.columnsPivot);
    console.log('rowsPivot', this.rowsPivot);
  }

  ngOnChanges() {}

  public tableInit() {
    // Null check
    if (!this.rows.length || !this.columns.length) {
      return;
    }
    // Add datasource from the rows to the datatable
    this.dataSource = new MatTableDataSource(this.rows);
    // Extract a string array from the columns prop for the table to use for column definitions
    this.columnDefinitions = this.columns.map(column => column.prop);
    // Enable sorting
    if (this.canSort) {
      this.dataSource.sort = this.sort;
    }
  }

  public pivotTable(rows: any[], columns: { label: string; prop: string }[]) {
    const rowsPivot: MatTableDataSource<any[]>[] = [];

    rows.forEach(row => {
      const rowsNew: any = [];
      columns.forEach(column => {
        rowsNew.push({
          $$label: column.label,
          value: row[column.prop] || null,
        });
      });
      rowsPivot.push(new MatTableDataSource(rowsNew));
    });
    return rowsPivot;
  }
}
