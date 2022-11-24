import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  user = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {
    this.verifyCurrentSession();
  }

  public get userCurrentSession(): User { 
    return this.user.value;
  }

  public getUser(){
    return this.user.asObservable();
  }

  public setUser(user: User){
    this.user.next(user);
  }

  public validateLogin(user: User): Observable<User>{
    return this.http.post<User>(`${environment.url_api_gateway}/login`, user);
  }

  public saveSessionDate(sessionDate: any){
    console.log(sessionDate);
    let userData: User = {
      id: sessionDate.user_id,
      token: sessionDate.token
    };
    //Code: JSON to String
    localStorage.setItem('session', JSON.stringify(userData));
    this.setUser(userData);
  }

  public getSessionData(): any {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  public verifyCurrentSession(){
    // Decode: String to JSON
    let currentSession = localStorage.getItem('session');
    if (currentSession) {
      this.setUser(JSON.parse(currentSession));
    } 
  }

  public IsThereSession(): boolean{
    let currentSession = localStorage.getItem('session');
    return (currentSession) ? true : false;
  }

  public logOut(){
    localStorage.removeItem('session');
    this.setUser(new User());
  }
}
