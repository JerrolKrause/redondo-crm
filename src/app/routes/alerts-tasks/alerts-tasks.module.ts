import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules

// Routing
import { routing } from './routes';

// Components
import { RootComponent } from './routes/root/root.component';
import { UserFormComponent } from './components/user-form/user-form.component';

// Route State Management
import { RouteUiStateQuery, RouteUiStateService, RouteUiStateStore } from './shared/state/ui';
import { RouteDomainStateService } from './shared/state/domain';
import { NtsTableModule } from '$features';

export const storeName = 'alertsTasks-UIState';

@NgModule({
  imports: [CommonModule, SiteModule, routing, NtsTableModule],
  declarations: [RootComponent, UserFormComponent],
  providers: [RouteUiStateService, RouteUiStateStore, RouteUiStateQuery, RouteDomainStateService],
  exports: [],
  entryComponents: [],
})
export class AlertsTasksModule {}
