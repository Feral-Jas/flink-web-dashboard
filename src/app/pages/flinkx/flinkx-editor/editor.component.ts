import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
