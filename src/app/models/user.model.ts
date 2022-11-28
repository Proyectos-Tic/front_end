import { Rol } from "./rol.model";

export class User {
    //Security backend attributes
    idUser? : number;
    nickname? : string;
    email? : string;
    password? : string;
    rol?: Rol;
    //Frontend attribute
    token?: string;
}
