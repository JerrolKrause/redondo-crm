import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-main',
  styles: [`.controls{background-color:#3f56ca;color:#fff;}`],
  templateUrl: './layout-main.component.html',
})
export class LayoutMainComponent {
  public leads = true;
  public calls = false;
  constructor() {}
}
