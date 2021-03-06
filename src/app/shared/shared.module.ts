import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes, Angular
import { DatePipe, CurrencyPipe } from '@angular/common';
// Pipes, Custom
import {
  CountPipe,
  DebouncePipe,
  PhoneNumberPipe,
  DurationPipe,
  FilterPipe,
  HtmlRemovePipe,
  SafeHtmlPipe,
  SlugPipe,
  SortPipe,
  StringPipe,
  TextCasePipe,
} from './pipes';
// Directives
import { FullScreenDirective, FocusDirective, ModalLaunchDirective, DomObserverDirective } from './directives';
import { TypePipe } from './pipes/type.pipe';

// Pipes + Directives
export const APP_PIPES_DIRECTIVES = [
  // Pipes
  CountPipe,
  DebouncePipe,
  PhoneNumberPipe,
  DurationPipe,
  FilterPipe,
  HtmlRemovePipe,
  SafeHtmlPipe,
  SlugPipe,
  SortPipe,
  StringPipe,
  TextCasePipe,
  TypePipe,

  // Directives
  FullScreenDirective,
  FocusDirective,
  ModalLaunchDirective,
  DomObserverDirective,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
  ],
  providers: [DatePipe, CurrencyPipe],
  declarations: [APP_PIPES_DIRECTIVES],
  exports: [APP_PIPES_DIRECTIVES],
  entryComponents: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
