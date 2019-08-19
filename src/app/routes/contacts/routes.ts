import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowerComponent } from './routes/borrower/borrower.component';
import { CompanyComponent } from './routes/company/company.component';
import { ProfileComponent } from './routes/company/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: BorrowerComponent,
    data: { title: 'Contact' },
  },
  {
    path: 'company/:guid',
    component: ProfileComponent,
    data: { title: 'Company' },
  },
  {
    path: 'company',
    component: CompanyComponent,
    data: { title: 'Company' },
  },
  
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
