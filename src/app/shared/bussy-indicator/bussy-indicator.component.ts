import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    Router
} from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { getAppIsBusy } from '../state/app.selectors';

@Component({
  selector: 'mls-bussy-indicator',
  templateUrl: './bussy-indicator.component.html',
  styleUrls: ['./bussy-indicator.component.css']
})
export class BussyIndicatorComponent implements OnInit {
  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOngoing = false;

  @Input()
  detectStoreIsBussy = false;

  constructor(
    private spinner: NgxSpinnerService,
    private store: Store,
    private router: Router) {
  }

  ngOnInit() {
      if (this.detectRoutingOngoing) {
          this.router.events
              .subscribe(
                  event => {
                      if (event instanceof NavigationStart
                       || event instanceof RouteConfigLoadStart) {
                        this.spinner.show();
                      }
                      else if (
                          event instanceof NavigationEnd ||
                          event instanceof NavigationError ||
                            event instanceof NavigationCancel ||
                            event instanceof RouteConfigLoadEnd) {
                          this.spinner.hide();
                      }
                  }
              );
      }
      else if (this.detectStoreIsBussy){
        this.store.select(getAppIsBusy)
        .subscribe(
          event => {
              if (event) {
                this.spinner.show();
              }
              else {
                  this.spinner.hide();
              }
          }
        );
      }
  }
}
