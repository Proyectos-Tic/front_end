import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor( private http: HttpClient) { }

  create(vote: Result){
    return this.http.post(
      `${environment.url_api_gateway}/result/insert`, vote);
  }
}


