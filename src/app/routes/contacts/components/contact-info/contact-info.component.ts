import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
