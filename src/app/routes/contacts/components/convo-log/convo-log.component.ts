import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-convo-log',
  templateUrl: './convo-log.component.html',
  styleUrls: ['./convo-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvoLogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
