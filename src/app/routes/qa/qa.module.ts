import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules
import { QaComponent } from './qa.component';
import { routing } from './qa.routes';
import { ChartsComponent } from './routes/charts/charts.component';
import { ChartModule, MapModule, TableModule } from '$features';
import { MapComponent } from './routes/map/map.component';
import { TableComponent } from './routes/table/table.component';

@NgModule({
  imports: [CommonModule, SiteModule, routing, ChartModule, MapModule, TableModule],
  declarations: [QaComponent, ChartsComponent, MapComponent, TableComponent],
  entryComponents: [],
})
export class QaModule {}
