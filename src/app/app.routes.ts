import { Routes } from '@angular/router';
import { NoContentComponent, LoginComponent } from '$routes'; // HomeComponent,

import { LayoutMainComponent } from '$components';
import { AuthGuard } from '$shared';

export const ROUTES: Routes = [
  // Routes without masterpage or that do not need to be authenticated need to go first
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Please Log In' },
  },

  {
    path: 'qa',
    loadChildren: () => import('./routes/qa/qa.module').then(m => m.QaModule),
    data: { title: 'E2E Testing' },
    canActivate: [AuthGuard],
  },

  // Example route param
  // {
  //  path: 'loan/:LNKey',
  //  component: HomeComponent,
  //  data: { title: 'Dashboard'},
  //  canActivate: [AuthGuard],
  // },

  // Routes that use masterpage go here
  // canActivate with AuthGuard determines if this is an authenticated only route
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      // Homepage non-lazy load implementation
      // {
      //  path: '',
      //  component: HomeComponent,
      //  data: { title: 'Dashboard' },
      //  canActivate: [AuthGuard]
      // },

      // Example for lazy loaded module with route params
      // { path: 'users/:empowerGuid', loadChildren: './routes/users/users.module#UsersModule', canActivate: [AuthGuard] },
      // { path: 'users', loadChildren: './routes/users/users.module#UsersModule', canActivate: [AuthGuard] },

      // Empty path string for homepage ('') needs to be LAST otherwise it catches all other routes
      {
        path: 'route',
        pathMatch: 'full',
        loadChildren: () => import('./routes/_route/route.module').then(m => m.RouteModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'contacts',
        // pathMatch: 'full',
        loadChildren: () => import('./routes/contacts/contacts.module').then(m => m.ContactsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'leads',
        // pathMatch: 'full',
        loadChildren: () => import('./routes/leads/leads.module').then(m => m.LeadsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        // pathMatch: 'full',
        loadChildren: () => import('./routes/search/search.module').then(m => m.SearchModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'alerts-tasks',
        // pathMatch: 'full',
        loadChildren: () => import('./routes/alerts-tasks/alerts-tasks.module').then(m => m.AlertsTasksModule),
        canActivate: [AuthGuard],
      },
      
      // Empty path string for homepage ('') needs to be LAST otherwise it catches all other routes
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
      },

      {
        path: '**',
        component: NoContentComponent,
        data: { title: 'Page Not Found' },
        canActivate: [AuthGuard],
      },
    ],
  },
];
