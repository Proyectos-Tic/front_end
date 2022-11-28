import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.url_api_gateway}/user/all`)
  }

  getOne(id_ : number): Observable<User>{
    return this.http.get<User>(`${environment.url_api_gateway}/user/by_id/${id_}`)
  }

  create(user: User){
    return this.http.post<User>(`${environment.url_api_gateway}/user/create`,user)
  }

  update(id: number, user: User){
    return this.http.put<User>(`${environment.url_api_gateway}/user/update/${id}`, user)
  }

  delete(id_: number){
    return this.http.delete(`${environment.url_api_gateway}/user/delete/${id_}`)
  }
}
