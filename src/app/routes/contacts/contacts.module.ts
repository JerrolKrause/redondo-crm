import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules

// Routing
import { routing } from './routes';

// Components
import { BorrowerComponent } from './routes/borrower/borrower.component';

// Route State Management
import { RouteUiStateQuery, RouteUiStateService, RouteUiStateStore } from './shared/state/ui';
import { RouteDomainStateService } from './shared/state/domain';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { AssociationsComponent } from './components/associations/associations.component';
import { ConvoLogComponent } from './components/convo-log/convo-log.component';
import { DocRepoComponent } from './components/doc-repo/doc-repo.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';

export const storeName = 'route-UIState'; // Change this property to be unique & route specific, IE 'route-UIState' => 'dashboard-UIState'

@NgModule({
  imports: [CommonModule, SiteModule, routing],
  declarations: [BorrowerComponent, ContactInfoComponent, AssociationsComponent, ConvoLogComponent, DocRepoComponent, PipelineComponent],
  providers: [RouteUiStateService, RouteUiStateStore, RouteUiStateQuery, RouteDomainStateService],
  exports: [],
  entryComponents: [],
})
export class ContactsModule {}