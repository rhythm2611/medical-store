import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Alert } from '../../interfaces/alert.interface';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../interfaces/alert-type.interface';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations : [
    trigger('fade',[
      state('void',style({opacity : 0})),
      transition('void => *',[
          animate(1000)
      ]),
      transition('* => void',[
          animate(1000)
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertSubscription = this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
            
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
    
    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
    }


    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }
        switch (alert.type) {
            case AlertType.success:
                return 'alert alert-success';
            case AlertType.info:
                return 'alert alert-info';
            case AlertType.warning:
                return 'alert alert-warning';
            case AlertType.danger:
                return 'alert alert-danger';
        }
    }

}
