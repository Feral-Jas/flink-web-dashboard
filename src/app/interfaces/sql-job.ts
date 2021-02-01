export interface SqlJobInterface {
  uuid?: string;
  name: string;
  sql: string;
  createdTime: Date;
  modifiedTime?: Date;
}
