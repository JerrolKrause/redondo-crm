import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

interface RowsPivot {
  dataSource: MatTableDataSource<any[]>;
  rowTitle?: string | null;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  @Input() rows: any[] = [];
  @Input() columns: { label: string; prop: string }[] = [];

  @Input() canSort = true;
  @Input() mobileBreakpoint = 768;
  @Input() mobileTitleProp: string | undefined;

  public dataSource!: MatTableDataSource<any[]>;
  public columnDefinitions: string[] = [];

  public rowsPivot: RowsPivot[] = [];
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

    this.rowsPivot = this.pivotTable(this.rows, this.columns, this.mobileTitleProp);
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

  /**
   * 
   * @param rows 
   * @param columns 
   * @param propTitle 
   */
  public pivotTable(rows: any[], columns: { label: string; prop: string }[], propTitle?: string) {
    const rowsPivot: RowsPivot[] = [];

    rows.forEach(row => {
      const rowsNew: any = [];
      let titlePropNew: string | null = null;
      columns.forEach(column => {
        rowsNew.push({
          $$label: column.label,
          value: row[column.prop] || null,
        });
        if (propTitle && propTitle === column.prop) {
          titlePropNew = row[column.prop];
        }
      });
      rowsPivot.push({
        dataSource: new MatTableDataSource(rowsNew),
        rowTitle: titlePropNew
      });
    });
    return rowsPivot;
  }
}
