import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  general_reports() {
    return this.http.get(`${environment.url_api_gateway}/reports/general`);
  }
}
