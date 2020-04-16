import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../interfaces/alert.interface';
import { AlertType } from '../interfaces/alert-type.interface';

@Injectable()

export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
      this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterRouteChange) {
                  this.keepAfterRouteChange = false;
              } else {
                  this.clear();
              }
          }
      });
  }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  alert(type : string, message : string, keepAfterRouteChange : boolean = false){

      this.keepAfterRouteChange = keepAfterRouteChange;

      if(type == 'success'){
          this.subject.next(<Alert>{ type: AlertType.success, message: message });
      }
      if(type == 'info'){
          this.subject.next(<Alert>{ type: AlertType.info, message: message });
      }
      if(type == 'warning'){
          this.subject.next(<Alert>{ type: AlertType.warning, message: message });
      }
      if(type == 'danger'){
          this.subject.next(<Alert>{ type: AlertType.danger, message: message });
      }
      
  }

  clear() {
      this.subject.next();
  }

}
