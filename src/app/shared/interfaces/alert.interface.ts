import { AlertType } from './alert-type.interface';

export interface Alert {
    type: AlertType;
    message: string;
    keepAfterRouteChange?: boolean;
  }