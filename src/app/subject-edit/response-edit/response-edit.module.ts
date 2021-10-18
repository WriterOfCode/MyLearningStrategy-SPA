import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ResponseEditInfoComponent } from './response-edit-info.component';
import { ResponseEditImageComponent } from './response-edit-image.component';
import { ResponseEditComponent } from './response-edit.component';

/* Font Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileCsv, faExclamation, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// Add FontAwesome icons
library.add( faFileCsv, faExclamation, faExclamationCircle, faExclamationTriangle );
/* NgRx */
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseEditGuard } from './response-edit.guard';
import { OriginatorGuard } from 'src/app/shared/originator.guard';
import { MsalGuard } from '@azure/msal-angular';


@NgModule({
  declarations: [
    ResponseEditComponent,
    ResponseEditInfoComponent,
    ResponseEditImageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResponseEditComponent,
        canDeactivate: [ ResponseEditGuard],
        canActivate: [MsalGuard, OriginatorGuard],
        canActivateChild: [ ResponseEditGuard ],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ResponseEditInfoComponent },
          { path: 'image', component: ResponseEditImageComponent },
        ]
      },
     ])
  ]
})
export class ResponseEditModule { }
