import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorModule } from 'src/app/vendor.module';
import { SharedModule } from '$shared';

import { TableColumnCellDirective } from './directives/cell-body.directive';
import { TableColumnHeaderDirective } from './directives/cell-header.directive';
import { TableColumnDirective } from './directives/column.directive';

import { TableComponent } from './table.component';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

const Components = [TableComponent, TableColumnCellDirective, TableColumnHeaderDirective, TableColumnDirective];

@NgModule({
  declarations: [Components],
  imports: [CommonModule, VendorModule, SharedModule, MatTableModule, MatSortModule, MatPaginatorModule],
  exports: [Components, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class NtsTableModule {}
