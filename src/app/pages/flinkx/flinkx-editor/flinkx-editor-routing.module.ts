import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlinkxEditorComponent } from "./flinkx-editor.component";

const routes: Routes = [
  {
    path: "",
    component: FlinkxEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlinkxEditorRoutingModule {}
