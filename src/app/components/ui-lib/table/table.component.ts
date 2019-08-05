import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChildren,
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TableColumnDirective } from './directives/column.directive';
import { TableColumnDefinition, RowsPivot, TableColumnMapped, TableSource, TableSourcePivot } from './table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() rows: any[] | undefined;
  @Input() columns: TableColumnDefinition[] | undefined;

  @Input() canSort = true;
  @Input() mobileBehavior: 'cards' | 'scroll' = 'scroll';
  @Input() mobileBreakpoint = 998;
  @Input() mobileTitleProp: string | undefined;

  /** Contains a boolean is the current screensize is above or below the mobile breakpoint */
  public isMobile$ = fromEvent(window, 'resize').pipe(
    debounceTime(100),
    map(e => (e && e.target ? (<any>e).target.innerWidth : null)), // Extract window width
    startWith(window.innerWidth), // Start with window width
    map(width => (width <= this.mobileBreakpoint ? true : false)), // If window width is less than mobileBreakpoint return true
    distinctUntilChanged(), // Only update on changes
  );

  /** Data source for main table */
  public tableData$ = new BehaviorSubject<TableSource | null>(null);
  /** Data source for mobile card view */
  public tableDataPivot$ = new BehaviorSubject<TableSourcePivot | null>(null);

  @ViewChildren(MatSort) sort!: QueryList<MatSort>;

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
  private loaded = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.mobileBehavior === 'cards' && !this.mobileTitleProp) {
      console.error('mobileTitleProp is required for card view');
    }
  }

  ngOnChanges() {
    if (this.loaded) {
      this.init();
    }
  }

  ngAfterViewInit() {
    this.init();
    this.loaded = true;
    setTimeout(() => this.ref.markForCheck());
  }

  /**
   * Initialize the table
   */
  public init() {
    if (this.columns && this.rows) {
      // Attach column templates
      const columns = this.columnsTemplateAttach(this.columns, this.columnTemplates);
      // Create normal table view data
      this.tableData$.next(this.dataCreate(this.rows, columns));
      // If mobile type is cards, create pivot table data
      if (this.mobileBehavior === 'cards') {
        this.tableDataPivot$.next(this.dataCreatePivot(this.rows, columns, this.mobileTitleProp));
      }
    }
  }

  /**
   * Create the structured data needed by the table
   * @param rows
   * @param columns
   * @param templates
   */
  private dataCreate(rows: any[], columns: TableColumnDefinition[]) {
    const tableData: TableSource = {
      dataSource: rows.length ? new MatTableDataSource(rows) : null,
      columns: columns,
      columnDefinitions: columns.map(column => column.prop),
    };
    if (this.canSort && rows.length) {
      tableData.dataSource.sort = this.sort.toArray()[0];
    }
    return tableData;
  }

  /**
   *  Create the table data needed for the card view by pivoting the columns to rows
   * @param rows
   * @param columns
   * @param propTitle
   */
  private dataCreatePivot(rows: any[], columns: TableColumnMapped[], propTitle?: string): TableSourcePivot {
    const rowsPivot: RowsPivot[] = [];
    // Loop through all rows
    rows.forEach(row => {
      const rowsNew: any[] = [];
      let titlePropNew: string | null = null;
      columns.forEach(column => {
        // Add the title of the card if prop data supplied
        // Note that this also strips the row out of the collection that has the title
        if (propTitle && propTitle === column.prop) {
          titlePropNew = row[column.prop];
        } else {
          rowsNew.push({
            _column: { ...column }, // Column Source
            _row: { ...row }, // Row Source
            label: column.label,
            value: row[column.prop] || null,
            type: column.type || null,
            typeArgs: column.typeArgs || null,
            templateCell: column.templateCell || null,
          });
        }
      });
      rowsPivot.push({
        dataSource: new MatTableDataSource(rowsNew),
        rowTitle: titlePropNew,
      });
    });
    return {
      rows: rowsPivot,
      columns: [{ label: 'Label', prop: 'label' }, { label: 'value', prop: 'value' }],
      columnDefinitions: ['label', 'value'],
    };
  }

  /**
   * Attach custom cell templates to their columns
   * @param columns
   * @param templates
   */
  private columnsTemplateAttach(columns: TableColumnDefinition[], templates: QueryList<TableColumnDirective>): TableColumnMapped[] {
    if (!templates) {
      return <TableColumnMapped[]>[...columns];
    }
    // Create a dictionary of the templates by field ID
    const templatesDictionary: { [key: string]: TableColumnDirective } = {};
    templates.forEach(template => (templatesDictionary[template.field] = template));
    // Loop through the columns, if a template match is found add it to the column
    return (<TableColumnMapped[]>columns).map(column => {
      const col = { ...column };
      // Add cell template
      if (templatesDictionary[<string>column.prop] && templatesDictionary[<string>column.prop].templateCell) {
        col.templateCell = templatesDictionary[<string>column.prop].templateCell;
      }
      // Add header template
      if (templatesDictionary[<string>column.prop] && templatesDictionary[<string>column.prop].templateHeader) {
        col.templateHeader = templatesDictionary[<string>column.prop].templateHeader;
      }
      return col;
    });
  }
}
