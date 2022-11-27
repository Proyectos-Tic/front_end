import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  user = new BehaviorSubject<User>(new User())

  constructor(private http: HttpClient) { 
    this.verifyCurrentSession();
  }
  //Getter and Setter
  public get userCurrentSession(): User{
    return this.user.value
  }

  public getUser(){
    return this.user.asObservable();
  }

  public setUser(user: User){
    this.user.next(user);
  }

  //Logic methods
  public validateLogin(user: User): Observable<any>{
    return this.http.post(`${environment.url_api_gateway}/login`,user);
  }

  public saveSessionData(sessionData: any){
    //Save the data from the ApiGateway in userData
    let userData : User = {
      idUser: sessionData.user_id,
      token: sessionData.token
    };
    // Code: JSON to String
    localStorage.setItem('session',JSON.stringify(userData));
    this.setUser(userData);
  }

  public verifyCurrentSession(){
    // Decode: String to JSON
    let currentSession = localStorage.getItem('session')
    if(currentSession){
      this.setUser(JSON.parse(currentSession));
    }
  }

  //TODO
  public IsThereSession(): boolean{
    return true;
  }

  public logOut(){

  }
}
