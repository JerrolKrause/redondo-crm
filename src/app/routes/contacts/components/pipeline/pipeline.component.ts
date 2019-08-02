import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipelineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
