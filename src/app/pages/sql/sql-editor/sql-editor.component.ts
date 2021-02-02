import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SqlService } from "services";
import { Subject } from "rxjs";
import { SqlMonacoEditorComponent } from "share/common/sql-monaco-editor/monaco-editor.component";
import { NzMessageService } from "ng-zorro-antd";
import { DagreComponent } from "share/common/dagre/dagre.component";
import { NodesItemCorrectInterface, NodesItemLinkInterface } from "interfaces";
@Component({
  selector: "flink-sql-editor",
  templateUrl: "./sql-editor.component.html",
  styleUrls: ["./sql-editor.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SqlEditorComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  planVisible: boolean;
  tipVisible: boolean;
  destroy$ = new Subject();
  graphData: string;
  flinkSql: string;
  sql_tip: string =
    "CREATE TABLE MyTable(\n\tid varchar,\n\tname varchar\n\t--ts timestamp,\n\t--tsDate Date\n)WITH(\n\ttype ='kafka11',\n\tbootstrapServers ='172.16.8.107:9092',\n\tzookeeperQuorum ='172.16.8.107:2181/kafka',\n\toffsetReset ='latest',\n\ttopic ='mqTest01',\n\ttimezone='Asia/Shanghai',\n\ttopicIsPattern ='false',\n\tparallelism ='1'\n);";

  @ViewChild(DagreComponent)
  dagreComponent: DagreComponent;
  @ViewChild(SqlMonacoEditorComponent)
  monacoEditorComponent: SqlMonacoEditorComponent;

  constructor(
    private sqlService: SqlService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.planVisible = false;
    this.tipVisible = false;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  testInterface(form: FormGroup) {
    const title = form.get("title")!.value;
    const text = form.get("text")!.value;
    this.sqlService.testSqlJob(title, text).subscribe((event) => {
      console.log(event);
    });
  }
  alert() {
    this.message.info(this.flinkSql);
  }
  showPlan() {
    const nodes: NodesItemCorrectInterface[] = [
      {
        description: "kafka1_source",
        id: "table1",
        parallelism: 1,
        detail: undefined,
        operator: "",
        operator_strategy: "",
        optimizer_properties: {},
      },
      {
        description: "kafka2",
        id: "table2",
        parallelism: 1,
        detail: undefined,
        operator: "",
        operator_strategy: "",
        optimizer_properties: {},
      },
      {
        description: "dameng1_side",
        id: "table3",
        parallelism: 1,
        detail: undefined,
        operator: "",
        operator_strategy: "",
        optimizer_properties: {},
      },
    ];
    const links: NodesItemLinkInterface[] = [
      {
        ship_strategy: "id,name",
        id: "link1",
        source: "table1",
        target: "table2",
      },
      {
        ship_strategy: "id,age",
        id: "link2",
        source: "table3",
        target: "table2",
      },
    ];
    this.planVisible = true;
    this.dagreComponent.flush(nodes, links, true);
  }
  hidePlan() {
    this.planVisible = false;
  }
  showTip() {
    this.tipVisible = true;
  }
  hideTip() {
    this.tipVisible = false;
  }
  dataChange(sql: string) {
    this.flinkSql = sql;
  }
}
