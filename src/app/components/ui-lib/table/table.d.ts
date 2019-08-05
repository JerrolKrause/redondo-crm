declare namespace NtsTable {
  export interface PaginateOptions {
    pageSize?: number;
    pageSizeOptions?: number[];
  }

  export interface Column {
    label: string;
    prop: string;
    type?: 'currency' | 'phoneNumber' | 'email' | 'date';
    typeArgs?: any;
  }

  export interface ColumnWithTemplates extends Column {
    templateCell?: TemplateRef<any>;
    templateHeader?: TemplateRef<any>;
  }
  
  export interface RowsPivot {
    dataSource: MatTableDataSource<ColumnWithTemplates[]>;
    rowTitle?: string | null;
  }
  
  export interface Data {
    dataSource: MatTableDataSource<ColumnWithTemplates[]> | null;
    columns: Table.Column[];
    columnDefinitions: string[];
  }
  
  export interface DataPivot {
    rows: RowsPivot[];
    columns: Table.Column[];
    columnDefinitions: string[];
  }
  
}

