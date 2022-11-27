import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  list(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`${environment.url_api_gateway}/candidato/all`)
  }

  getOne(id_: string): Observable<Candidate>{
    return this.http.get(`${environment.url_api_gateway}/candidato/${id_}`)
    
  }

  create(candidato: Candidate){
    return this.http.post<Candidate>(`${environment.url_api_gateway}/candidato/create`, candidato)
  }

  update(candidato: Candidate, id_ : string){
    return this.http.put<Candidate>(`${environment.url_api_gateway}/candidato/update/${id_}`, candidato)
  }

  delete(id_ : string){
    return this.http.delete(`${environment.url_api_gateway}/candidato/delete/${id_}`)
  }
}
