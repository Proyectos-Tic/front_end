import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  list(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.url_api_gateway}/rol/all`)
  }

  getOne(id_ : number): Observable<Rol>{
    return this.http.get<Rol>(`${environment.url_api_gateway}/rol/${id_}`)
  }

  create(rol: Rol){
    return this.http.post<Rol>(`${environment.url_api_gateway}/rol/create`,rol)
  }

  update(id: number, rol: Rol){
    return this.http.put<Rol>(`${environment.url_api_gateway}/rol/update/${id}`, rol)
  }

  delete(id_: number){
    return this.http.delete(`${environment.url_api_gateway}/rol/delete/${id_}`)
  }
}
