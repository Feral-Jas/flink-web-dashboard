import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURL } from "sql.conf";
import { SqlJobInterface } from "interfaces";
@Injectable({
  providedIn: "root",
})
export class SqlService {
  getSqlJobs(name: string) {
    return this.httpClient.get<SqlJobInterface[]>(
      BaseURL + "jobs?name=" + name
    );
  }
  getSqlPlan(sql: string) {
    return sql;
  }
  saveJob(sqlJob: SqlJobInterface) {
    return this.httpClient.post<{ code: number }>(
      BaseURL + "jobs/create",
      sqlJob
    );
  }
  deleteJob(uuid: string) {
    return this.httpClient.delete<{ code: number }>(BaseURL + "jobs/" + uuid);
  }
  constructor(private httpClient: HttpClient) {}
}
