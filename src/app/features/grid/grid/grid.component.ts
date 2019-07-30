import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  OnChanges,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions, ColumnApi, ColDef, GridApi, RowNode } from 'ag-grid-community';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { debounce } from 'helpful-decorators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

// import { GridTemplateRendererComponent } from '../grid-template-renderer/grid-template-renderer.component';
import { GridStatusBarComponent } from '../grid-status-bar/grid-status-bar.component';
import { GridColumnDirective } from '../directives/column.directive';
import { GridService } from '../services/grid.service';

const defaultsDeep = require('lodash/defaultsDeep');

@AutoUnsubscribe()
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: [
    // After moving starter OUT of monorepo, update path to node_modules
    '../../../../../node_modules/ag-grid-community/dist/styles/ag-grid.css', // ../../../../../node_modules
    '../../../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css', // ../../../../../node_modules
    './grid.component.scss',
  ],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('grid', { static: false }) grid!: AgGridNg2;
  @ViewChild('gridContainer', { static: false }) gridContainer!: ElementRef;

  @Input() parentRef: any;
  /** Hold and set default options for grid*/
  private _gridOptions: GridOptions = {
    context: {
      // this: this.parentRef,
    },
    // A default column definition with properties that get applied to every column
    defaultColDef: {
      width: 150, // Set every column width
      editable: false, // Make every column editable
      enableRowGroup: true, // Make every column groupable
      filter: 'agSetColumnFilter', // Make every column use 'text' filter by default
      menuTabs: ['generalMenuTab', 'filterMenuTab'], // , 'columnsMenuTab'
      // set the cell renderer to 'group'
      // cellRenderer: 'agGroupCellRenderer',
    },
    statusBar: {
      statusPanels: [{ statusPanel: 'statusBarComponent', align: 'left', key: 'statusBarComponent' }],
    },
  };
  @Input()
  set gridOptions(options: GridOptions) {
    // options.groupRowRenderer:  'agGroupCellRenderer';
    this._gridOptions = defaultsDeep(this._gridOptions, options);
  }
  get gridOptions() {
    return this._gridOptions;
  }

  private _gridFilterTerm: string | null | undefined;
  @Input()
  set gridFilterTerm(term: string | null) {
    this._gridFilterTerm = term ? term : null;
    if (this.grid && this.grid.api) {
      this.grid.api.setQuickFilter(term);
      this.grid.api.deselectAll();
    }
  }
  get gridFilterTerm() {
    return this._gridFilterTerm || null;
  }

  private _gridState: GridState = {
    columns: [],
    sorts: [],
    filters: {},
  };
  @Input()
  set gridState(gridState: GridState) {
    this._gridState = {
      ...this._gridState,
      ...gridState,
    };
  }
  get gridState() {
    return this._gridState;
  }

  @Input() rowData: any[] | undefined;
  /** The property containing the unique ID of the row data */
  @Input() rowUniqueId: string | undefined;
  @Input() getMainMenuItems: any;
  @Input() columnDefs: ColDef[] | undefined;
  @Input() animateRows: boolean | undefined;
  @Input() enableSorting: boolean | undefined;
  @Input() enableFilter: boolean | undefined;
  @Input() enableColResize: boolean | undefined;
  @Input() enableRangeSelection: boolean | undefined;
  @Input() rememberGroupStateWhenNewData: any;
  @Input() groupUseEntireRow: boolean | undefined;
  @Input() getContextMenuItems: any;
  @Input() frameworkComponents: any;
  @Input() rowGroupPanelShow: any;
  @Input() rowSelection: any;
  /** When new entries are passed in, should rows that are currently selected stay selected */
  @Input() rowsStaySelected = true;

  @Output() stateChange = new EventEmitter<GridState>();
  @Output() rowsSelected = new EventEmitter<any[]>();
  @Output() selectedRowDataDisplayed = new EventEmitter<any[]>();

  /** called when grid data is ready and rendered */
  @Output() gridIsReady = new EventEmitter<any[]>();

  public rows: any[] = [];
  public gridApi: GridApi | undefined;
  public gridColumnApi: ColumnApi | undefined;
  public gridLoaded: boolean | undefined;
  public gridAllowUpdate = false;
  public gridComponents = { statusBarComponent: GridStatusBarComponent };
  public gridStatusComponent: GridStatusBarComponent | undefined;

  private columnsDefault: ColDef[] | null | undefined;
  /** Dictionary of keys being pressed */
  private keysPressed: { [key: string]: boolean } = {};
  /** Was the event a right click */
  private isRightClick = false;
  /** Preserve a list of rows that are currently selected. Used in conjunction with rowsStaySelected to keep rows highlighted*/
  private rowsSelectedList: any[] | undefined;

  private key: string | undefined;

  /** Holds custom DOM templates passed from parent */
  private _columnTemplates: any;
  @ContentChildren(GridColumnDirective)
  set columnTemplates(val: QueryList<GridColumnDirective>) {
    const arr = val.toArray();
    if (arr.length) {
      this._columnTemplates = arr;
    }
  }
  get columnTemplates(): QueryList<GridColumnDirective> {
    return this._columnTemplates;
  }

  // Manage keyboard events
  @HostListener('document:keydown', ['$event'])
  keyPressed = (event: KeyboardEvent) => this.keyboardEvent(event);
  @HostListener('document:keyup', ['$event'])
  keyUp = (event: KeyboardEvent) => this.keyboardEvent(event);

  constructor(private gridSvc: GridService) {}

  ngOnInit() {
    this.rowDataUpdate();
    this.gridOptions.context = this.parentRef;
    // On window resize event, fit the grid columns to the screen
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        if (this.gridLoaded && this.gridColumnApi) {
          this.gridFit();
        }
      });
  }

  ngOnChanges(model: any) {
    if (model.gridState && this.gridLoaded) {
      this.gridAllowUpdate = false;
      this.gridStateRestore();
    }
    if (model.rowData && this.rowsStaySelected && this.rowUniqueId && this.rowsSelectedList && this.gridApi) {
      this.gridSvc.rowsReselect(this.rowUniqueId, this.rowsSelectedList, this.gridApi);
    }

    if (model.rowData) {
      this.rowDataUpdate();
    }
  }

  /**
   * Ensure changes are made before updating grid
   */
  public rowDataUpdate() {
    const key = JSON.stringify(this.rowData);
    if (this.rowData && this.key !== key) {
      this.rows = this.rowData;
      this.key = key;
    }
  }

  /**
   * When the grid is ready and has finished loading
   * @param params
   */
  public gridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = this.grid.api;
    // Set reference to status component so state can be pushed
    this.gridStatusComponent = (<any>this).gridOptions.api.getStatusPanel('statusBarComponent').getFrameworkComponentInstance();
    if (this.gridStatusComponent) {
      // Attach reset method to status component so the status method
      this.gridStatusComponent.reset = this.gridReset.bind(this);
    }

    // Grid is ready, restore default state if any
    this.gridStateRestore();
    this.gridLoaded = true;
    this.gridAllowUpdate = true;
    // Check if a global filter term is present, refilter
    if (this.gridFilterTerm) {
      this.grid.api.setQuickFilter(this.gridFilterTerm);
      this.grid.api.deselectAll();
    }
    this.gridIsReady.emit();
  }

  /** After the grid has loaded data */
  public gridFirstDataRendered() {
    this.gridFit();
  }

  /** Have the columns fill the available space if less than grid width */
  public gridFit() {
    if (this.gridColumnApi && this.gridContainer && this.gridContainer.nativeElement) {
      const widthCurrent = this.gridColumnApi.getColumnState().reduce((a, b) => a + <any>b.width, 0);
      const widthGrid = this.gridContainer.nativeElement.offsetWidth;
      if (widthCurrent < widthGrid && this.gridAllowUpdate && this.gridLoaded) {
        // Disable allow update to prevent loop
        this.gridAllowUpdate = false;
        // Resize columns to fit screen
        this.grid.api.sizeColumnsToFit();
        this.gridAllowUpdate = true;
      }
    }
  }

  /** When the grid is resized */
  @debounce(100, {
    leading: false,
    trailing: true,
  })
  public gridSizeChanged() {
    // console.log('Grid Resized')
  }

  /**
   * Get selected rows out of the datagrid
   * @param event
   */
  @debounce(200)
  public gridSelectionChanged() {
    const rows = this.grid.api.getSelectedRows();
    // HACK: When a grid filter term is present, rows are selected at random in diff quantities and reverse
    // Reversing gives at least the first in order correct lead
    if (this._gridFilterTerm && this._gridFilterTerm !== '') {
      rows.reverse();
    }
    this.rowsSelectedList = rows;
    this.rowsSelected.emit(rows);
  }

  public onRowSelected($event: any) {
    if ($event.node.selected) {
      this.selectedRowDataDisplayed.emit($event.data);
    }
  }

  /**
   * On right click
   */
  public cellContextMenu(e: any) {
    this.isRightClick = true;
    // Deselect all previous rows if control is not pressed OR the current node is not selected
    if (!this.keysPressed.Control && !e.node.selected) {
      this.grid.api.deselectAll();
    }
    this.grid.api.clearRangeSelection();
    e.node.setSelected(true); // Select current row
    this.onRowSelected(e); // Set as lead
  }

  /**
   * When a range selection (via drag select) is finished on the data grid
   * TODO: Add config to allow selecting rows vs selecting cells
   * @param e
   */
  @debounce(200)
  public gridRangeSelectionChanged(e: any) {
    // Wait till the drag is finished
    // Ignore right click events
    if (e && e.finished && !this.isRightClick) {
      // Get the grid range selection
      const selections = this.grid.api.getRangeSelections();
      if (selections && selections.length) {
        const nodesList: RowNode[] = [];
        // Loop through selections
        selections.forEach((selection: any) => {
          // Determine if this is a top to bottom or bottom to top drag, set appropriate index for FOR loop below
          const start = selection.start.rowIndex < selection.end.rowIndex ? selection.start.rowIndex : selection.end.rowIndex;
          const end = selection.start.rowIndex > selection.end.rowIndex ? selection.start.rowIndex : selection.end.rowIndex;
          // Loop through all nodes, if it's index falls between start and end, add it to nodes list
          this.grid.api.forEachNode((node: any) => {
            if (node.rowIndex >= start && node.rowIndex <= end) {
              nodesList.push(node);
            }
          });
        });

        // Deselect all previous rows if shift or control is not pressed
        if (!this.keysPressed.Shift && !this.keysPressed.Control) {
          this.grid.api.deselectAll();
        }
        // Set all selected nodes to true
        nodesList.forEach(node => node.setSelected(true));
        // Clear range section
        this.grid.api.clearRangeSelection();

        // Get the node that the drag started on
        // const startNode = this.grid.api.getDisplayedRowAtIndex(selection[0].start.rowIndex);
      }

      // TODO: Emit selected columns not just rows
    }
    this.isRightClick = false;
  }

  /** Reset the grid state */
  public gridReset() {
    this.gridAllowUpdate = false;
    this.grid.api.setSortModel(null);
    this.grid.api.setFilterModel(null);
    this.getGridState();
    if (this.gridColumnApi) {
      this.gridColumnApi.resetColumnState();
    }
    if (this.gridStatusComponent) {
      this.gridStatusComponent.gridStateChange(this.gridState);
    }
    this.gridAllowUpdate = true;
    this.gridFit();
  }

  /**
   * On grid state changes such as sorting, filtering and grouping
   * Added debounce since some events fire quickly like resizing
   * @param $event
   */
  @debounce(100, {
    leading: false,
    trailing: true,
  })
  public gridStateChanged($event: any) {
    if (this.gridAllowUpdate) {
      this.getGridState();
      if ($event.type === 'columnResized') {
        this.gridFit();
      }
    }
    // Only save state after grid has been fully loaded
    if (this.gridLoaded && this.gridAllowUpdate && this.gridStatusComponent) {
      // Pass gridstate to status component
      this.gridStatusComponent.gridStateChange(this.gridState);
    }
  }

  /** Get grid state and emit to parent */
  public getGridState() {
    if (this.columnsDefault && this.gridColumnApi) {
      this.gridState = {
        // columns: this.columnStateRestore(this.columnsDefault, this.gridColumnApi.getColumnState()),
        columns: <any>this.gridSvc.columnsRestore(this.columnsDefault, <any[]>this.gridColumnApi.getColumnState()),
        sorts: this.grid.api.getSortModel(),
        filters: this.grid.api.getFilterModel(),
      };
      this.stateChange.emit(this.gridState);
    }
  }

  /** Restore the grid state */
  public gridStateRestore() {
    if (this.grid && this.gridColumnApi && this.gridState) {
      this.gridAllowUpdate = false;
      if (this.gridState.columns) {
        // Set column defaults
        this.columnsDefault = this.gridSvc.columnGetNewReferences(this.gridState.columns);
        // Update column state
        this.gridColumnApi.setColumnState(this.gridState.columns);
        if (this.columnsDefault) {
          const columns = <any>this.gridSvc.columnsTemplateAttach(this.columnsDefault, this.columnTemplates);
          // this.columnDefs = columns;
          this.grid.api.setColumnDefs(columns);
        }
      }
      if (this.gridState.sorts) {
        this.grid.api.setSortModel(this.gridState.sorts);
      }
      if (this.gridState.filters) {
        this.grid.api.setFilterModel(this.gridState.filters);
        this.grid.api.onFilterChanged();
      }
      if (this.gridStatusComponent) {
        // If restoring gridstate, update status component
        this.gridStatusComponent.gridStateChange(this.gridState);
      }

      setTimeout(() => {
        this.gridAllowUpdate = true;
      }, 500);
    }
  }

  /** When data in the grid changes */
  public gridRowDataChanged() {
    // Whenever data is loaded into the grid the filters are wiped out. Check if filters are present and reload them
    if (this.gridState.filters) {
      this.grid.api.setFilterModel(this.gridState.filters);
      this.grid.api.onFilterChanged();
    }
  }

  /**
   * Manage keypresses
   * @param event
   */
  protected keyboardEvent(event: KeyboardEvent) {
    const keysPressed = { ...this.keysPressed };
    switch (event.type) {
      case 'keydown':
        keysPressed[event.key] = true;
        break;
      case 'keyup':
        keysPressed[event.key] = false;
        break;
    }
    this.keysPressed = keysPressed;
  }

  ngOnDestroy() {}
}
