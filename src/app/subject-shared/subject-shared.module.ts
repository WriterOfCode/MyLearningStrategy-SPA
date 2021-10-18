import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { SubjectSharedComponent } from './subject-shared.component';
import { SubjectSharedSortDirective } from './subject-shared-sort.directive';
import { SubjectSharedResolver } from '../shared/resolvers/subject-shared.resolver';
import { SubjectSharedPageReducer } from './state/subject-shared-page.reducer'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SubjectSharedApiEffects } from './state/subject-shared-api.effects';
import { SubjectSharedEntityReducer } from './state/subject-shared.entity.reducer';
import { SubjectSharedShellComponent } from './subject-shared-shell.component';
import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
    SubjectSharedComponent,
    SubjectSharedSortDirective,
    SubjectSharedShellComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    SharedModule,
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('subjectsSharedPage', SubjectSharedPageReducer),
    StoreModule.forFeature('subjectsShared', SubjectSharedEntityReducer),
    EffectsModule.forFeature([SubjectSharedApiEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: SubjectSharedShellComponent,
        resolve: { subject: SubjectSharedResolver },
      }
     ])
  ],
  providers: [ SubjectSharedResolver ],
})
export class SubjectSharedModule { }
