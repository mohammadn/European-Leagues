import { Table } from "./table.model";

export interface Standing {
  group: string;
  stage: string;
  table: [Table];
  type: string;
}
