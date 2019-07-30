import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ColumnApi } from 'ag-grid-community';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-status-bar',
  templateUrl: './grid-status-bar.component.html',
  styleUrls: ['./grid-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStatusBarComponent implements OnInit {
  public gridState: GridState = {
    sorts: [],
    columns: [],
    filters: {},
  };
  public gridFilters: any[] = [];
  public gridGroups: any[] = [];

  private grid!: AgGridNg2;
  private gridColumnApi!: ColumnApi;
  private params: any;
  /** Disable updates while resetting */
  private resetting = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.grid = this.params;
    this.gridColumnApi = this.params.columnApi;
  }

  /**
   * When the grid state is changed. This is passed from the parent component
   * @param gridState
   */
  public gridStateChange(gridState: GridState) {
    // Don't update if resetting
    if (!this.resetting) {
      // Local reference to grid state
      this.gridState = { ...gridState };

      // Get grid filters
      if (gridState && gridState.filters) {
        this.gridFilters = Object.keys(gridState.filters).map(key => {
          return {
            ...(<any>gridState).filters[key],
            field: key,
          };
        });
      }

      // Get the active groups
      if (gridState && gridState.columns) {
        this.gridGroups = gridState.columns.filter((column: any) => column.rowGroupIndex !== null);
      }

      this.ref.detectChanges();
    }
  }

  /**
   * Attach AG grid parameters
   * @param params
   */
  public agInit(params: any): void {
    this.params = params;
  }

  /** Reset all sorts/filters/groups. Reference is passed by grid.component.ts */
  public reset() {}

  /** Remove sorting */
  public removeSort() {
    this.grid.api.setSortModel(null);
  }

  /**
   * Remove specified group
   * @param colId - colID of group to remove
   */
  public removeGroup(colId: string) {
    if (this.gridState && this.gridState.columns) {
      // Loop through columns and set rowGroupIndex to null for the matched group
      this.gridState.columns.forEach(col => {
        if (col.colId === colId) {
          col.rowGroupIndex = null;
        }
      });
      // Update Api
      this.gridColumnApi.setColumnState(this.gridState.columns);
    }
  }

  /**
   * Remove specified filter
   * @param field - field of filter to remove
   */
  public removeFilter(field: string) {
    if (this.gridState && this.gridState.filters) {
      delete this.gridState.filters[field];
      this.grid.api.setFilterModel(this.gridState.filters);
    }
  }
}
