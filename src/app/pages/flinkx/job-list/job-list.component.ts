import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
