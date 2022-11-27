import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  list(): Observable<Table[]>{
    return this.http.get<Table[]>(`${environment.url_api_gateway}/mesa/all`)
  }

  getOne(id_: string): Observable<Table>{
    return this.http.get(`${environment.url_api_gateway}/mesa/${id_}`)
    
  }

  create(mesa: Table){
    return this.http.post<Table>(`${environment.url_api_gateway}/mesa/create`, mesa)
  }

  update(mesa: Table, id_ : string){
    return this.http.put<Table>(`${environment.url_api_gateway}/mesa/update/${id_}`, mesa)
  }

  delete(id_ : string){
    return this.http.delete(`${environment.url_api_gateway}/mesa/delete/${id_}`)
  }
}
