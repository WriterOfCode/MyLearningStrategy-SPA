import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material-module';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SubjectListComponent } from './subject-list.component';
import { SubjectListSortDirective } from './subject-list-sort.directive';
// /* Fort Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OriginatorGuard } from '../shared/originator.guard';
import { SubjectEntityApiEffects } from '../shared/state/subjects.entity.effects';
import { SubjectShellComponent } from './subject-shell.component';
import { SubjectResolver } from '../shared/resolvers/subject.resolver';
import { SubjectPageReducer } from './state/subjects-page.reducer';
import { CompleteSubjectEntityReducer } from '../shared/state/subjects.entity.reducer';

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    StoreModule.forFeature('subjectsPage', SubjectPageReducer),
    StoreModule.forFeature('subjects',CompleteSubjectEntityReducer),
    EffectsModule.forFeature([SubjectEntityApiEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: SubjectShellComponent,
        resolve: { subject: SubjectResolver },
        canActivate: [ MsalGuard, OriginatorGuard],
      }
     ])
  ],
  declarations: [
    SubjectListComponent,
    SubjectListSortDirective,
    SubjectShellComponent,
  ],
  providers: [ SubjectResolver]
})
export class SubjectModule { }
