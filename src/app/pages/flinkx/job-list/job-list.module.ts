import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobListComponent } from "./job-list.component";
import { ShareModule } from "share/share.module";
import { JobListRoutingModule } from "./job-list-routing.module";

@NgModule({
  declarations: [JobListComponent],
  imports: [CommonModule, ShareModule, JobListRoutingModule],
})
export class JobListModule {}
