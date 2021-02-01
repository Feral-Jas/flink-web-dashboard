import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURL } from "sql.conf";
import { SqlJobInterface } from "interfaces";
@Injectable({
  providedIn: "root",
})
export class SqlService {
  testSqlJob(title: string, text: string) {
    return this.httpClient.post<SqlJobInterface>(BaseURL + "jobs", {
      title,
      text,
    });
  }
  getSqlJobs(name: string) {
    return this.httpClient.get<SqlJobInterface>(BaseURL + "jobs?name=" + name);
  }
  getSqlPlan(sql: string) {
    return sql;
  }

  constructor(private httpClient: HttpClient) {}
}
