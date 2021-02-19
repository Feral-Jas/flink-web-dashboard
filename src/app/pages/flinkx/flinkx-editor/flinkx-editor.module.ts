import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlinkxEditorComponent } from "./flinkx-editor.component";
import { ShareModule } from "share/share.module";
import { FlinkxEditorRoutingModule } from "./flinkx-editor-routing.module";

@NgModule({
  declarations: [FlinkxEditorComponent],
  imports: [CommonModule, ShareModule, FlinkxEditorRoutingModule],
})
export class FlinkxEditorModule {}
