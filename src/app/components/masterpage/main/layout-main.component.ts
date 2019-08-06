import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
})
export class LayoutMainComponent {
  public leads = true;
  public calls = false;
  constructor() {}
}
