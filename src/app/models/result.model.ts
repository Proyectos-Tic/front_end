import { Candidate } from "./candidate.model";
import { Party } from "./party.model";
import { Table } from "./table.model";

export class Result {
  _id?: string;
  candidate?: Candidate;
  table?: Table;
  party?: Party;
}
