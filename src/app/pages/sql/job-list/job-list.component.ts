import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";

class SqlJob {
  name: string;
  sql: string;
  creator: string;
  description: string;
}
@Component({
  selector: "flink-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit {
  dataSet: Array<SqlJob> = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSet.push({
      name: "hacko",
      sql: "insert into kafka2 select * from kafka1",
      creator: "James",
      description: "first job",
    });
    this.dataSet.push({
      name: "metro",
      sql:
        "insert into kafka3 select * from kafka4 join dameng1 on kafka3.id=dameng1.id",
      creator: "James",
      description: "second job",
    });
    console.log(this.dataSet);
  }
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
}
