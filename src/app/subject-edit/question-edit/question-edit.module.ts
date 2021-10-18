import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Font Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileCsv, faExclamation, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// Add FontAwesome icons
library.add( faFileCsv, faExclamation, faExclamationCircle, faExclamationTriangle );
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/* MASAL imports */
import { MsalGuard } from '@azure/msal-angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { OriginatorGuard } from 'src/app/shared/originator.guard';
import { QuestionEditInfoComponent } from './question-edit-info.component';
import { QuestionEditGuard } from './question-edit.guard';
import { QuestionEditImageComponent } from './question-edit-image.component';
import { QuestionEditComponent } from './question-edit.component';
import { ResponseListComponent } from '../response-list/response-list.component';
import { ResponsListSortDirective } from '../response-list/respons-list-sort.directive';
import { ResponseEditGuard } from '../response-edit/response-edit.guard';
import { ResponsesListResolver } from '../response-list/responses.resolver';
import { ResponsePageReducer } from '../state/response.page.reducer';
import { SubjectEntityApiEffects } from '../../shared/state/index'

@NgModule({
  declarations: [
    QuestionEditComponent,
    QuestionEditInfoComponent,
    QuestionEditImageComponent,
    ResponseListComponent,
    ResponsListSortDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgbModule,
    StoreModule.forFeature('responsesPage', ResponsePageReducer),
    EffectsModule.forFeature([SubjectEntityApiEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: QuestionEditComponent,
        canDeactivate: [ QuestionEditGuard],
        canLoad: [MsalGuard, OriginatorGuard],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full', canDeactivate:[QuestionEditGuard] },
          { path: 'info', component: QuestionEditInfoComponent, canDeactivate:[QuestionEditGuard]  },
          { path: 'image', component: QuestionEditImageComponent, canDeactivate:[QuestionEditGuard]  },
          { path: 'responses',
            component: ResponseListComponent,
            canDeactivate:[ResponseEditGuard] ,
            resolve: { resolvedData: ResponsesListResolver}
          },
          {
            canActivateChild: [ QuestionEditGuard ],
            canDeactivate: [ QuestionEditGuard ],
            path: 'response',
            loadChildren: () =>
            import('../response-edit/response-edit.module').then(m => m.ResponseEditModule)
          },
        ]
      },
     ])
  ],
})
export class QuestionEditModule { }
