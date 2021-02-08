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
import {
  NodesItemCorrectInterface,
  NodesItemLinkInterface,
  SqlJobInterface,
} from "interfaces";
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
    "name:[job]\nCREATE TABLE MyTable(\n\tid varchar,\n\tname varchar\n\t--ts timestamp,\n\t--tsDate Date\n)WITH(\n\ttype ='kafka11',\n\tbootstrapServers ='172.16.8.107:9092',\n\tzookeeperQuorum ='172.16.8.107:2181/kafka',\n\toffsetReset ='latest',\n\ttopic ='mqTest01',\n\ttimezone='Asia/Shanghai',\n\ttopicIsPattern ='false',\n\tparallelism ='1'\n);";
  @ViewChild(DagreComponent)
  dagreComponent: DagreComponent;
  @ViewChild(SqlMonacoEditorComponent)
  monacoEditorComponent: SqlMonacoEditorComponent;

  constructor(
    private sqlService: SqlService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    if (history.state.name != undefined && history.state.sql != undefined) {
      this.flinkSql = "name:[" + history.state.name + "]\n" + history.state.sql;
    }
    // console.log(this.replaceBracket("(;)"));
    this.planVisible = false;
    this.tipVisible = false;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  saveJob() {
    const isCreate = history.state.uuid == undefined ? true : false;
    const carriageSplit = this.flinkSql.split("\n");
    const firstLine = carriageSplit.shift();
    const restLine = carriageSplit.join("\n");
    let jobName = /name:\[(?<name>\S+)\]/gm.exec(firstLine!);
    const job: SqlJobInterface = {
      name: jobName!.groups!.name,
      sql: restLine,
      createdTime: new Date(),
    };
    if (isCreate) {
      this.sqlService.saveJob(job).subscribe((res) => {
        if (res.created != undefined) this.message.info("保存成功");
      });
    } else {
      this.sqlService
        .editJob({ ...job, uuid: history.state.uuid })
        .subscribe((res) => {
          if (res.edited != undefined) this.message.info("修改成功");
        });
    }
  }
  runJob() {
    const carriageSplit = this.flinkSql.split("\n");
    const firstLine = carriageSplit.shift();
    const restLine = carriageSplit.join("\n");
    let jobName = /name:\[(?<name>\S+)\]/gm.exec(firstLine!);
    const job: SqlJobInterface = {
      name: jobName!.groups!.name,
      sql: restLine,
      createdTime: new Date(),
    };
    this.sqlService.runJob(job).subscribe((data) => {
      this.message.info(data.jobId);
    });
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
