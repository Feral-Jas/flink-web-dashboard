import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SqlService } from "services";
import { Subject } from "rxjs";
import { MonacoEditorComponent } from "share/common/monaco-editor/monaco-editor.component";
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
  destroy$ = new Subject();
  graphData: string;
  @ViewChild(DagreComponent)
  dagreComponent: DagreComponent;
  @ViewChild(MonacoEditorComponent)
  monacoEditorComponent: MonacoEditorComponent;
  constructor(
    private sqlService: SqlService,
    private fb: FormBuilder,
    private message: NzMessageService // private jarService: JarService
  ) {}
  ngOnInit() {
    this.planVisible = false;
    this.validateForm = this.fb.group({
      title: ["kafka2kafka"],
      text: [
        "CREATE TABLE MyTable(\n\tid varchar,\n\tname varchar\n\t--ts timestamp,\n\t--tsDate Date\n)WITH(\n\ttype ='kafka11',\n\tbootstrapServers ='172.16.8.107:9092',\n\tzookeeperQuorum ='172.16.8.107:2181/kafka',\n\toffsetReset ='latest',\n\ttopic ='mqTest01',\n\ttimezone='Asia/Shanghai',\n\ttopicIsPattern ='false',\n\tparallelism ='1'\n);",
      ],
    });
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
    this.message.info("deployed");
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
}
