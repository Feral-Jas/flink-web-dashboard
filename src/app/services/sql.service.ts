import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SqlService {
  testSqlJob(title: string, text: string) {
    return this.httpClient.post("http://localhost:4201/test/", { title, text });
  }
  getSqlJobs(name: string) {
    return this.httpClient.get("http://localhost:4201/jobs?name=" + name);
  }
  getSqlPlan(sql: string) {
    return sql;
  }

  constructor(private httpClient: HttpClient) {}
}
