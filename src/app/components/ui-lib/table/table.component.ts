import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { NgTemplateOutlet } from '@angular/common';
import { TableColumnDirective } from './directives/column.directive';
import { TableColumnDefinition, RowsPivot, TableColumnMapped } from './table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() rows: any[] = [];
  @Input() columns: TableColumnDefinition[] = [];
  // @Input() columnsMobile: TableColumnDefinition[] = this.columns;

  @Input() canSort = true;
  @Input() mobileEnabled = true;
  @Input() mobileBreakpoint = 768;
  @Input() mobileTitleProp: string | undefined;

  public dataSource!: MatTableDataSource<any[]>;
  public columnDefinitions: string[] = [];

  public rowsPivot: RowsPivot[] = [];
  public columnsPivot = [{ label: 'Label', prop: '$$label' }, { label: 'value', prop: 'value' }];
  public columnDefinitionsPivot: string[] = ['$$label', 'value'];
  public loaded$ = new BehaviorSubject<boolean>(false);

  public isMobile$ = fromEvent(window, 'resize').pipe(
    debounceTime(100),
    map(e => (e && e.target ? (<any>e).target.innerWidth : null)), // Extract window width
    startWith(window.innerWidth),
    map(width => (width <= this.mobileBreakpoint ? true : false)), // If window width is less than mobileBreakpoint return true
    distinctUntilChanged(), // Only update on changes
  );

  public columns$ = this.isMobile$.pipe(
    switchMap(isMobile => {
      return isMobile ? this.columnsPivot : this.columnsMapped;
    }),
  );

  @ViewChild('tableTemplate', { static: true }) tableTemplate!: NgTemplateOutlet;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  /** Holds custom DOM templates passed from parent */
  private _columnTemplates: any;
  @ContentChildren(TableColumnDirective)
  set columnTemplates(val: QueryList<TableColumnDirective>) {
    const arr = val.toArray();
    if (arr.length) {
      this._columnTemplates = arr;
    }
  }
  get columnTemplates(): QueryList<TableColumnDirective> {
    return this._columnTemplates;
  }

  public columnsMapped: TableColumnMapped[] = [];

  constructor() {}

  ngOnInit() {
    console.log(this);
  }

  ngOnChanges() {}

  ngAfterViewInit() {
    this.tableInit();
    this.loaded$.next(true);
  }

  public tableInit() {
    // Null check
    if (!this.rows.length || !this.columns.length) {
      return;
    }
    // Attach custom column templates
    this.columnsMapped = this.columnsTemplateAttach(this.columns, this.columnTemplates);
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
      this.rowsPivot = this.pivotTable(this.rows, this.columnsMapped, this.mobileTitleProp);
    }
  }

  public columnsUpdate() {}

  /**
   *
   * @param rows
   * @param columns
   * @param propTitle
   */
  public pivotTable(rows: any[], columns: TableColumnMapped[], propTitle?: string) {
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
            template: column.template,
          });
        }
      });
      rowsPivot.push({
        dataSource: new MatTableDataSource(rowsNew),
        rowTitle: titlePropNew,
      });
    });
    return rowsPivot;
  }

  /**
   * Attach custom cell templates to their columns
   * @param columns
   * @param templates
   */
  public columnsTemplateAttach(columns: TableColumnDefinition[], templates: QueryList<TableColumnDirective>): TableColumnMapped[] {
    console.log(templates);
    if (!templates) {
      return <TableColumnMapped[]>[...columns];
    }
    // Create a dictionary of the templates by field ID
    const templatesDictionary: { [key: string]: TableColumnDirective } = {};
    templates.forEach(template => (templatesDictionary[template.field] = template));
    // Loop through the columns, if a template match is found add it to the column
    return (<TableColumnMapped[]>columns).map(column => {
      const col = { ...column };
      // If match found, add template
      if (templatesDictionary[<string>column.prop]) {
        col.template = templatesDictionary[<string>column.prop].templateCell;
      }
      return col;
    });
  }
}
