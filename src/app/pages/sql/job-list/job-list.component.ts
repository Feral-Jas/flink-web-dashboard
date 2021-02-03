import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { SqlJobInterface } from "interfaces";
import { SqlService } from "services";
import { Subject } from "rxjs";
import { NzMessageService } from "ng-zorro-antd";
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
    private message: NzMessageService
  ) {}
  deleteRow(uuid: string) {
    const row = this.dataSet.find((row) => row.uuid == uuid);
    if (row != undefined) {
      const rowIndex = this.dataSet.indexOf(row);
      this.sqlService.deleteJob(uuid).subscribe((res) => {
        if (res.code == 0) {
          this.message.info("删除成功");
          this.dataSet.splice(rowIndex, 1);
          this.dataSet = [...this.dataSet];
          this.cdr.markForCheck();
        }
      });
    }
  }
  shorten(sql: string) {
    return sql.split(";").pop();
  }
  ngOnInit() {
    this.sqlService.getSqlJobs("").subscribe(
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
