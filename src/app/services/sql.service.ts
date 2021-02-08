import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURL } from "sql.conf";
import { SqlJobInterface } from "interfaces";
@Injectable({
  providedIn: "root",
})
export class SqlService {
  getSqlJobs() {
    return this.httpClient.get<{ jobs: SqlJobInterface[] }>(BaseURL + "jobs");
  }
  getSqlPlan(sql: string) {
    return sql;
  }
  saveJob(sqlJob: SqlJobInterface) {
    return this.httpClient.post<{ created: SqlJobInterface }>(
      BaseURL + "jobs",
      sqlJob
    );
  }
  editJob(sqlJob: SqlJobInterface) {
    return this.httpClient.put<{ edited: SqlJobInterface }>(
      BaseURL + "jobs/" + sqlJob.uuid,
      sqlJob
    );
  }
  deleteJob(uuid: string) {
    return this.httpClient.delete<{ deleted: string }>(
      BaseURL + "jobs/" + uuid
    );
  }
  runJob(sqlJob: SqlJobInterface) {
    return this.httpClient.post<{ jobId: string }>(
      BaseURL + "jobs/run",
      sqlJob
    );
  }
  constructor(private httpClient: HttpClient) {}
}
