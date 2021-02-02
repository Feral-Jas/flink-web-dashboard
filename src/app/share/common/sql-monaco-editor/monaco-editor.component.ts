/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference path="../../../../../node_modules/monaco-editor/monaco.d.ts" />

import {
  AfterViewInit,
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from "@angular/core";
import { fromEvent, merge, Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { MonacoEditorService } from "share/common/monaco-editor/monaco-editor.service";
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import { atob } from "js-base64";
@Component({
  selector: "sql-monaco-editor",
  template: ``,
  styleUrls: ["./monaco-editor.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SqlMonacoEditorComponent implements AfterViewInit, OnDestroy {
  private editor: IStandaloneCodeEditor;
  private destroy$ = new Subject();
  // value: string =
  //   "CREATE TABLE MyTable(\n\tid varchar,\n\tname varchar\n\t--ts timestamp,\n\t--tsDate Date\n)WITH(\n\ttype ='kafka11',\n\tbootstrapServers ='172.16.8.107:9092',\n\tzookeeperQuorum ='172.16.8.107:2181/kafka',\n\toffsetReset ='latest',\n\ttopic ='mqTest01',\n\ttimezone='Asia/Shanghai',\n\ttopicIsPattern ='false',\n\tparallelism ='1'\n);";
  value: string = atob(
    "Q1JFQVRFIFRBQkxFIE15VGFibGUoCiAgICBuYW1lIHZhcmNoYXIsCiAgICBpZCBpbnQKIClXSVRIKAogICAgdHlwZSA9J2thZmthJywKICAgIGJvb3RzdHJhcFNlcnZlcnMgPSdsb2NhbGhvc3Q6OTA5MicsCiAgICB6b29rZWVwZXJRdW9ydW0gPSdsb2NhbGhvc3Q6MjE4MScsCiAgICBvZmZzZXRSZXNldCA9J2xhdGVzdCcsCiAgICB0b3BpYyA9J3NvdXJjZTMnLAogICAgdGltZXpvbmU9J0FzaWEvU2hhbmdoYWknLAogICAgdXBkYXRlTW9kZSA9J2FwcGVuZCcsCiAgICBlbmFibGVLZXlQYXJ0aXRpb25zID0nZmFsc2UnLAogICAgdG9waWNJc1BhdHRlcm4gPSdmYWxzZScsCiAgICBwYXJhbGxlbGlzbSA9JzEnCiApOwoKIENSRUFURSBUQUJMRSBNeVJlcygKICAgIG5hbWUgdmFyY2hhciwKICAgIGlkIGludAogKVdJVEgoCiAgICB0eXBlID0na2Fma2EnLAogICAgYm9vdHN0cmFwU2VydmVycyA9J2xvY2FsaG9zdDo5MDkyJywKICAgIHpvb2tlZXBlclF1b3J1bSA9J2xvY2FsaG9zdDoyMTgxJywKICAgIG9mZnNldFJlc2V0ID0nbGF0ZXN0JywKICAgIHRvcGljID0nc291cmNlNCcsCiAgICB0aW1lem9uZT0nQXNpYS9TaGFuZ2hhaScsCiAgICB1cGRhdGVNb2RlID0ndXBzZXJ0JywKICAgIGVuYWJsZUtleVBhcnRpdGlvbnMgPSdmYWxzZScsCiAgICB0b3BpY0lzUGF0dGVybiA9J2ZhbHNlJywKICAgIHBhcmFsbGVsaXNtID0nMScKICk7CgogaW5zZXJ0IGludG8gTXlSZXMgc2VsZWN0ICogZnJvbSBNeVRhYmxl"
  );
  @Input()
  set inputValue(value: string) {
    this.value = value;
  }
  get inputValue() {
    return this.value;
  }

  @Output()
  dataChange = new EventEmitter<string>();

  setupMonaco() {
    const hostElement = this.elementRef.nativeElement;
    this.editor = monaco.editor.create(hostElement, {
      scrollBeyondLastLine: false,
      glyphMargin: true,
      language: "apex",
      wordWrap: "on",
      readOnly: false,
      minimap: {
        enabled: false,
      },
    });
    if (this.value) {
      this.editor.getModel()!.setValue(this.value);
    }
    this.editor.onDidChangeModelContent(() => {
      this.dataChange.emit(this.editor.getModel()!.getValue());
    });
  }

  layout() {
    if (this.editor) {
      this.editor.layout();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private monacoEditorService: MonacoEditorService
  ) {}

  ngAfterViewInit() {
    if ((window as any).monaco) {
      this.setupMonaco();
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "libs/vs/loader.js";
      script.onload = () => {
        const onGotAmdLoader = () => {
          // Load monaco
          (window as any).require.config({ paths: { vs: "libs/vs" } });
          (window as any).require(["vs/editor/editor.main"], () => {
            setTimeout(() => this.setupMonaco());
          });
        };
        onGotAmdLoader();
      };
      // Add the script tag to the page in order to start loading monaco
      document.body.appendChild(script);
    }
    merge(fromEvent(window, "resize"), this.monacoEditorService.layout$)
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(200)
      )
      .subscribe(() => {
        this.layout();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.editor.dispose();
  }
}
