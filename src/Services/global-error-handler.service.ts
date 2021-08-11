import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalErrorHandlerService {
  errorEvent: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  handleError(error: Error | HttpErrorResponse) {     
    console.log('GlobalErrorHandlerService');
    console.error(error);
  }
  showError(event:any) {
     this.errorEvent.next(event);
  }  
 }
