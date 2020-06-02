import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../interfaces/response-payload.interface';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomerPayload } from '../interfaces/user-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private base_url : string = environment.baseUrl

  constructor(private http : HttpClient) { }

  getCustomers() : Observable<CustomerPayload[]>{
    return this.http.post<ResponsePayload>(`${this.base_url}/customer/getAll`, {}).pipe(
      map(response => response.data)
    )
  }
}
