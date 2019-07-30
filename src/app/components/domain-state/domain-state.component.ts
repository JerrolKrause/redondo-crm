import { Component, OnInit, Input } from '@angular/core';
import { Domain } from '$domain';

@Component({
  selector: 'nt-domain-state',
  templateUrl: './domain-state.component.html',
  styleUrls: ['./domain-state.component.css'],
})
export class DomainStateComponent implements OnInit {
  /** Default domain state */
  @Input() state!: Domain.State;
  /** Should errors be shown */
  @Input() errorVisible = true;
  /** Custom error message */
  @Input() errorMessage!: string;
  /** Should the loader be shown when data is already present in state */
  @Input() loaderDisabled = true;

  constructor() {}

  ngOnInit() {}
}
