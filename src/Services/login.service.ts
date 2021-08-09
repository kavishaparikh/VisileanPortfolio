import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
private _loginUrl=""

  constructor(private http:HttpClient) { }

  validateUser(username:any, password:any):Observable<any>{    
    var body = "?password=" + encodeURIComponent(password) + "&username=" + username;    
    return this.http.post(this._loginUrl+body, body, { observe: "response" });
  }

}