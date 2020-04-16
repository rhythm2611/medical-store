import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserPayload, UserLoginPayload, UserTokenPayload } from '../interfaces/user-payload.interface';
import { Observable, throwError } from 'rxjs';
import { ResponsePayload } from '../interfaces/response-payload.interface';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private base_url : string = environment.baseUrl
  private readonly ACCESS_TOKEN = 'x-access-token';
  private readonly REFRESH_TOKEN = 'x-refresh-token';
  private loggedUser: string;
  private tokens : UserTokenPayload

  constructor(private http : HttpClient) { }

  registerUser(user : UserPayload) : Observable<ResponsePayload>{
    return this.http.post<ResponsePayload>(`${this.base_url}/auth/register`, user, {
      observe : 'body'
    })
  }

  loginUser(user : UserLoginPayload) : Observable<ResponsePayload>{
    return this.http.post<ResponsePayload>(`${this.base_url}/auth/login`, user, {
      observe : 'body'
    }).pipe(
      tap(response => {
        this.tokens = {
          accessToken : response.data.accessToken,
          refreshToken : response.data.refreshToken
        } 
        this.doLogin(user.email,this.tokens)
      })
    )
  }

  refreshToken() : Observable<ResponsePayload>{
    return this.http.post<ResponsePayload>(`${this.base_url}/auth/token`, {
      'token': this.getRefreshToken()
    }).pipe(
      tap((response : ResponsePayload) => {
        this.saveAccessToken(response.data.accessToken)
      }),
      catchError(error => {
        this.removeTokens()
        return throwError(error);
      })
    )
  }

  logoutUser() : Observable<ResponsePayload>{
    return this.http.post<ResponsePayload>(`${this.base_url}/auth/logout`, {
      'token': this.getRefreshToken()
    }).pipe(
      tap(() => {
        this.doLogoutUser()
      }),
      catchError(error => {
        this.removeTokens()
        return throwError(error);
      })
    )
  }

  isLoggedIn() : boolean {
    return !!this.getAccessToken();    
  }

  getUserDetails() : Observable<any>{
    return this.http.post<ResponsePayload>(`${this.base_url}/profile`, {}).pipe(
      map(response => response.data)
    )
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLogin(email: string, tokens : UserTokenPayload){
    this.loggedUser = email;
    this.saveTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private saveAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  private saveTokens(tokens : UserTokenPayload) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  
}
