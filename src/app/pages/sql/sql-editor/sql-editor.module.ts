import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "share/share.module";
import { SqlEditorComponent } from "./sql-editor.component";
import { SqlEditorRoutingModule } from "./sql-editor-routing.module";
@NgModule({
  declarations: [SqlEditorComponent],
  imports: [
    CommonModule,
    SqlEditorRoutingModule,
    ReactiveFormsModule,
    ShareModule,
  ],
})
export class SqlEditorModule {}
