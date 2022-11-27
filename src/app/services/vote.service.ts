import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  list(): Observable<Vote[]>{
    return this.http.get<Vote[]>(`${environment.url_api_gateway}/voto/all`)
  }

  getOne(id_ : string): Observable<Vote>{
    return this.http.get<Vote>(`${environment.url_api_gateway}/vote/${id_}`)
  }

  create(mesaId: string,candidatoId: string){
    return this.http.post(`${environment.url_api_gateway}/voto/create/mesa/${mesaId}/candidato/${candidatoId}`,'')
  }

  delete(votoId: string){
    return this.http.delete(`${environment.url_api_gateway}/voto/delete/${votoId}`)
  }
}
