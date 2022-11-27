import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Party } from '../models/party.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) { }

  list(): Observable<Party[]>{
    return this.http.get<Party[]>(`${environment.url_api_gateway}/partido/all`)
  }

  getOne(id_: string): Observable<Party>{
    return this.http.get(`${environment.url_api_gateway}/partido/${id_}`)
    
  }

  create(partido: Party){
    return this.http.post<Party>(`${environment.url_api_gateway}/partido/create`, partido)
  }

  update(partido: Party, id_ : string){
    return this.http.put<Party>(`${environment.url_api_gateway}/partido/update/${id_}`, partido)
  }

  delete(id_ : string){
    return this.http.delete(`${environment.url_api_gateway}/partido/delete/${id_}`)
  }
}
