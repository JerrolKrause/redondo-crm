import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowerComponent } from './routes/borrower/borrower.component';

const routes: Routes = [
  {
    path: '',
    component: BorrowerComponent,
    data: { title: 'Root' },
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
