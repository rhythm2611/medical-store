import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AlertService } from './alert.service';

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { 
    
  }

  handleError(error: Error | HttpErrorResponse) {
    //alert();
    const errorService = this.injector.get(ErrorService);
    const alertService = this.injector.get(AlertService);
    //const logger = this.injector.get(LoggingService);
    //const notifier = this.injector.get(NotificationService);
    let message : string;
    //let stackTrace;
    if (error instanceof HttpErrorResponse) {
     
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      //notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      //notifier.showError(message);
    }
    alertService.alert('danger', message, true);
    // Always log errors
    //logger.logError(message, stackTrace);
    //console.error(error);
  }
}
