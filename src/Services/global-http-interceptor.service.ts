import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,  
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatSnackBar} from "@angular/material/snack-bar";
import { GlobalErrorHandlerService } from "./global-error-handler.service";

@Injectable({
  providedIn: "root"
})
export class GlobalHttpInterceptorService {
  login: boolean = true;
  constructor(
    public router: Router,
    private injector: Injector,
    private _snackBar: MatSnackBar,
    private connectorService: GlobalErrorHandlerService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const route = this.injector.get(Router);
     var token :any= localStorage.getItem("Token");
     console.log(token,"ttt")
     let headers:any = new HttpHeaders();  
    headers = headers.append("Authorization", `Bearer ${token}`);
    headers.set('content-type', undefined);
        
    

    if (token !== null) {
      this.login = false;
      req = req.clone({ headers });
    }
    return next.handle(req).pipe(
      catchError(error => {
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) 
        {
          if (error.error instanceof ErrorEvent)
          {
            console.error("Error Event");
          } 
          else 
          {
            console.log(`error status : ${error.status} ${error.statusText} ${error.error.message}`);            
            switch (error.status) {
              case 401: //login  
              console.log("Token is "+token);
              if(token != "null"){
                console.log("Route is " + route.url);
                if ((route.url == "/" )) 
                {
                  console.log("Route is home " + route.url);
                  console.log("error.error",error.error.message);
                  

                  if (error.error.message == "Error: Unauthorized") 
                  {
                    console.log("dshkbfs");
                    
                    var errMsg = "User Name or Password Incorrect";
                    this._snackBar.open(errMsg, "Sorry", {
                      duration: 2000,
                      horizontalPosition: "right",
                      verticalPosition: "bottom"
                    });
                    this.connectorService.showError(errMsg);
                  }
                  handled = true;
                } 
                else if (error.error.message == "Invalid authentication token") 
                {
                  console.log("Session invalide");
                  localStorage.setItem("backUrl", route.url);
                  console.log("Will Navigate to " + route.url);
                  this.router.navigate(["/"]) ;
                  this._snackBar.open("Your Session is Invalidated please Relogin to Access", "Sorry", {
                    duration: 2000,
                    horizontalPosition: "right",
                    verticalPosition: "bottom"
                  });
                  handled = true;
                }
              }
              else{
                this._snackBar.open("Something Went Wrong","Sorry");
              }
              break;
              case 403: //forbidden
                this.router.navigate(["/"]);
                handled = true;
                break;
            }
          }
        } else {
          console.error("Other Errors");
        }

        if (handled) {
          console.log("return back ");
          return of(error.message);
        } 
        else
        {
          console.log("throw error back to to the subscriber");
          return throwError(error);
        }
      })
    );
  }
}