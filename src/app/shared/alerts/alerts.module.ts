import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './alerts.component';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [BrowserModule, NgbModule, NgbAlert],
  // declarations:[AlertsComponent],
  // exports: [AlertsComponent],

})
export class AlertsModule { }
