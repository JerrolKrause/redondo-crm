export interface TableColumnDefinition {
  label: string;
  prop: string;
  type?: 'currency' | 'phoneNumber' | 'email' | 'date';
  typeArgs?: any;
}

export interface TableColumnMapped extends TableColumnDefinition {
  template?: TemplateRef<any>;
}

interface RowsPivot {
  dataSource: MatTableDataSource<TableColumnMapped[]>;
  rowTitle?: string | null;
}
