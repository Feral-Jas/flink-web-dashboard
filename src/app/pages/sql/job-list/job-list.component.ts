import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { SqlJobInterface } from "interfaces";
import { SqlService, StatusService } from "services";
import { flatMap, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
@Component({
  selector: "flink-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit, OnDestroy {
  dataSet: Array<SqlJobInterface> = [];
  destroy$ = new Subject();
  constructor(
    private cdr: ChangeDetectorRef,
    private sqlService: SqlService,
    private statusService: StatusService
  ) {}
  deleteRow(rowName: string): void {
    // console.log(this.dataSet);
    const row = this.dataSet.find((row) => row.name == rowName);
    if (row != undefined) {
      const rowIndex = this.dataSet.indexOf(row);
      this.dataSet.splice(rowIndex, 1);
      this.dataSet = [...this.dataSet];
      this.cdr.markForCheck();
    }
    // console.log(this.dataSet);
  }
  showCur() {
    console.log(this.dataSet);
  }
  shorten(sql: string) {
    return sql.substring(0, 70) + "...";
  }
  ngOnInit() {
    this.statusService.refresh$
      .pipe(
        takeUntil(this.destroy$),
        flatMap(() => this.sqlService.getSqlJobs(""))
      )
      .subscribe(
        (data) => {
          this.dataSet = data;
          this.cdr.markForCheck();
        },
        () => {
          this.cdr.markForCheck();
        }
      );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
