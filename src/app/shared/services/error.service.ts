import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  constructor() { }

  getClientErrorMessage(error: Error): string {    
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    let message : string = error.error.msg
    if(typeof message !== 'undefined' && message != null){
      message = error.error.msg
    }else{
      message = error.message
    }
    return navigator.onLine ? message : 'No Internet Connection';
  }
}
