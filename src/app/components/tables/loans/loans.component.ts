import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loans-table',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoansTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
