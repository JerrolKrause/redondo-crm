import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './routes/root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    data: { title: 'Alerts & Tasks' },
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
