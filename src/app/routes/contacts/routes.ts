import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowerComponent } from './routes/borrower/borrower.component';
import { CompanyComponent } from './routes/company/company.component';

const routes: Routes = [
  {
    path: '',
    component: BorrowerComponent,
    data: { title: 'Contact' },
  },
  {
    path: 'company',
    component: CompanyComponent,
    data: { title: 'Company' },
  },
  
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
