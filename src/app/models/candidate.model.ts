import { Party } from "./party.model";

export class Candidate {
  _id?: string;
  name?: string;
  lastname?: string;
  resolution?: number;
  cc?: number;
  party?: Party;
}
