import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { ErrorHandler } from '@angular/core';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';

export const sharedProviders = [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
]