import { Injectable, QueryList } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { GridColumnDirective } from '../directives/column.directive';
import { GridTemplateRendererComponent } from '../grid-template-renderer/grid-template-renderer.component';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  constructor() {}

  /**
   *
   * @param colsDefault
   * @param colsModified
   */
  public columnsRestore(colsDefault: ColDef[], colsModified: ColDef[]) {
    // Create dictionary of original columns
    const colsOriginal = this.columnGetNewReferences(colsDefault);
    const colsOriginalDictionary: { [key: string]: ColDef } = {};
    if (colsOriginal) {
      colsOriginal.forEach(col => (colsOriginalDictionary[<string>col.colId] = col));
      // Loop through modified columns, add together
      return colsModified.map(col => {
        return {
          ...colsOriginalDictionary[<string>col.colId],
          ...col,
        };
      });
    }
  }

  /**
   * Save the original column definitions
   * AG grid mutates the original input columns and destroys a lot of data
   * @param columns
   */
  public columnGetNewReferences(columns: ColDef[]) {
    // Make sure data exists
    if (columns && columns.length) {
      return columns.map(column => {
        const col = {
          ...column,
        };
        /**
         * Add some defensive coding to ensure consist property mapping
         */
        if (!col.field) {
          col.field = col.colId;
        }

        if (!col.colId) {
          col.colId = col.field;
        }

        if (!(<any>col).label) {
          (<any>col).label = col.headerName;
        }

        if (!col.headerName) {
          col.headerName = (<any>col).label;
        }

        return col;
      });
    }
    return null;
  }

  /**
   * Attach custom cell templates to their columns
   * @param columns
   * @param templates
   */
  public columnsTemplateAttach(columns: ColDef[], templates: QueryList<GridColumnDirective>) {
    if (!columns) {
      return;
    }
    // Create a dictionary of the templates by field ID
    const templatesDictionary: { [key: string]: GridColumnDirective } = {};
    templates.forEach(template => (templatesDictionary[template.field] = template));
    // Loop through the columns, if a template match is found add it to the column
    return columns.map(column => {
      const col = { ...column };
      // If match found, add template
      if (templatesDictionary[<string>column.field]) {
        col.cellRendererFramework = GridTemplateRendererComponent;
        col.cellRendererParams = {
          ngTemplate: templatesDictionary[<string>column.field].templateCell,
        };
      }
      return col;
    });
  }

  /**
   *
   * @param rowsToSelect
   * @param gridApi
   */
  public rowsReselect(rowUniqueId: string, rowsToSelect: any[], gridApi: GridApi) {
    if (!rowUniqueId) {
      console.error('rowUniqueId prop is required to use row reselecting');
    }
    if (rowsToSelect && rowsToSelect.length) {
      setTimeout(() => {
        const rowSelectedDictionary: Record<string, boolean> = {};
        rowsToSelect.forEach(row => (rowSelectedDictionary[row[rowUniqueId]] = true));
        gridApi.forEachNode(node => {
          const key = node.data[rowUniqueId];
          // Model.entry prop is KEY
          if (rowSelectedDictionary[key]) {
            node.setSelected(true); // Set this row to select
          }
        });
      });
    }
  }
}
