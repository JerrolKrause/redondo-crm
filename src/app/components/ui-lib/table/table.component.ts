import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

export interface TableColumnDefinition {
  label: string;
  prop: string;
  type?: 'currency' | 'phoneNumber' | 'email' | 'date';
  typeArgs?: any;
}

interface RowsPivot {
  dataSource: MatTableDataSource<TableColumnDefinition[]>;
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
  @Input() columns: TableColumnDefinition[] = [];
  @Input() columnsMobile: TableColumnDefinition[] = this.columns;

  @Input() canSort = true;
  @Input() mobileEnabled = true;
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
    if (this.mobileEnabled) {
      // Create the pivot rows for the mobile view
      this.rowsPivot = this.pivotTable(this.rows, this.columnsMobile, this.mobileTitleProp);
    }
  }

  /**
   *
   * @param rows
   * @param columns
   * @param propTitle
   */
  public pivotTable(rows: any[], columns: TableColumnDefinition[], propTitle?: string) {
    const rowsPivot: RowsPivot[] = [];
    // Loop through all rows
    rows.forEach(row => {
      const rowsNew: any = [];
      let titlePropNew: string | null = null;
      columns.forEach(column => {
        // Add the title of the card if prop data supplied
        // Note that this also strips the row out of the collection that has the title
        if (propTitle && propTitle === column.prop) {
          titlePropNew = row[column.prop];
        } else {
          rowsNew.push({
            $$label: column.label,
            value: row[column.prop] || null,
            type: column.type || null,
            typeArgs: column.typeArgs || null,
          });
        }
      });
      console.log(rowsNew);
      rowsPivot.push({
        dataSource: new MatTableDataSource(rowsNew),
        rowTitle: titlePropNew,
      });
    });
    return rowsPivot;
  }
}
