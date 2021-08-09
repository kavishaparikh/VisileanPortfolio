import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private rute: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    //    if (localStorage.getItem('Token') == undefined) {
    //   console.log("NOT TOKEN");
    //   // this.rute.navigate(['/login']);
    //   return false;
    // }
    // else {
      return true;
    }
  // }
  
}
