import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QaComponent } from './qa.component';
import { ChartsComponent } from './routes/charts/charts.component';
import { MapComponent } from './routes/map/map.component';
import { TableComponent } from './routes/table/table.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
    data: { title: 'Map' },
  },
  {
    path: 'charts',
    component: ChartsComponent,
    data: { title: 'Charts' },
  },
  {
    path: 'table',
    component: TableComponent,
    data: { title: 'Table' },
  },
  {
    path: '',
    component: QaComponent,
    data: { title: 'QA Home' },
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
