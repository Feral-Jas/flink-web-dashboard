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
    return this.httpClient.post<{ code: number }>(BaseURL + "jobs", sqlJob);
  }
  editJob(sqlJob: SqlJobInterface) {
    return this.httpClient.put<{ code: number }>(BaseURL + "jobs", sqlJob);
  }
  deleteJob(uuid: string) {
    return this.httpClient.post<{ code: number }>(
      BaseURL + "jobs/" + uuid,
      null
    );
  }
  constructor(private httpClient: HttpClient) {}
}
