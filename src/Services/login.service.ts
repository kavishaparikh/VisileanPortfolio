import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { threadId } from 'worker_threads';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
private _loginUrl=""

  constructor(private http:HttpClient) { }

    // loginUser(user)
    // {
    //   return this
    // }
}
