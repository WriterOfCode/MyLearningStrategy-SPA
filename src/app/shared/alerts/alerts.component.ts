import { Component } from '@angular/core';
import { Alert, AlertDuration,AlertTheam } from "../models/Alert";
// import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAlertMessages } from '../state/app.selectors'
@Component({
  selector: 'mls-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  public alerts$: Observable<Alert[]>;
  constructor(private appState: Store ) {
    this.alerts$ = this.appState.select(getAlertMessages);
  }

  close(alert: Alert) {
    // this.alertsServ.remove(alert);
  }
}