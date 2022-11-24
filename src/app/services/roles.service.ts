import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.url_api_gateway}/rols`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Rol>{
    return this.http.get<Rol>(`${environment.url_api_gateway}/rol/${id}`);
  }

  /**
   * 
   * @param rol 
   * @returns 
   */
  create(rol: Rol){
    return this.http.post<Rol>(`${environment.url_api_gateway}/rol/create`, rol);
  }

  /**
   * 
   * @param rol
   * @param id 
   * @returns 
   */
  update(rol: Rol, id: string){
    return this.http.put<Rol>(`${environment.url_api_gateway}/rol/update/${id}`, rol);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id:string){
    return this.http.delete(`${environment.url_api_gateway}/rol/delete/${id}`);
  }
}
