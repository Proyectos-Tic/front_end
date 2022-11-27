import { Party } from "./party.model";

export class Candidate {
    _id? : string;
    id_personal?: string;
    lastname?: string;
    n_resolution?: string;
    name?: string;
    partido?: Party;
}
