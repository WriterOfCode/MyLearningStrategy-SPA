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
/* Chips imports */
import { MaterialModule } from '../material-module';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SharedModule } from '../shared/shared.module';

import { SubjectEditInfoComponent } from './subject-edit-info.component';
import { SubjectEditImageComponent } from './subject-edit-image.component';
import { SubjectEditShellComponent } from './subject-edit-shell.component';
import { QuestionsPageReducer } from './state/questions.page.reducer';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsListSortDirective } from './questions-list/questions-list-sort.directive';
import { QuestionsResolverService } from './questions-list/questions-resolver.service';
import { CategoriesResolver } from '../shared/resolvers/categories.resolver';
import { SubjectEntityApiEffects } from '../shared/state/index'
import { ResponsePageReducer } from './state/response.page.reducer';

@NgModule({
  declarations: [
    SubjectEditInfoComponent,
    SubjectEditImageComponent,
    SubjectEditShellComponent,
    QuestionsListComponent,
    QuestionsListSortDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    NgbModule,
    MaterialModule,
    StoreModule.forFeature('questionsPage', QuestionsPageReducer),
    StoreModule.forFeature('responsesPage', ResponsePageReducer),
    EffectsModule.forFeature([SubjectEntityApiEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: SubjectEditShellComponent,
        canActivate: [MsalGuard],
        resolve: [CategoriesResolver],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: SubjectEditInfoComponent },
          { path: 'image', component: SubjectEditImageComponent },
          { path: 'questions',
            component: QuestionsListComponent,
            resolve: { resolvedData: QuestionsResolverService}
          },
          {
            path: 'question',
            loadChildren: () =>
            import('./question-edit/question-edit.module').then(m => m.QuestionEditModule)
          },
        ]
      }
     ])
  ],
  providers: [
    CategoriesResolver,
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ]
})
export class SubjectEditModule { }
