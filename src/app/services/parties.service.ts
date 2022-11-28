import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Party } from '../models/party.model';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {

  constructor(private http: HttpClient) { }
  /**
   *
   * @returns
   */
   list(): Observable<Party[]>{
    return this.http.get<Party[]>(`${environment.url_api_gateway}/partys`);
  }

  /**
   *
   * @param id
   * @returns
   */
  getOne(id: string): Observable<Party>{
    return this.http.get<Party>(`${environment.url_api_gateway}/party/${id}`);
  }

  /**
   *
   * @param party
   * @returns
   */
  create(party: Party){
    return this.http.post<Party>(`${environment.url_api_gateway}/party/insert`, party);
  }

  /**
   *
   * @param id
   * @param party
   * @returns
   */
  edit(id: string, party: Party){
    return this.http.put<Party>(`${environment.url_api_gateway}/party/update/${id}`, party);
  }

  /**
   *
   * @param id
   * @returns
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/party/delete/${id}`);
  }
}
