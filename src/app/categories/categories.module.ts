import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { MaterialModule } from '../material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CategoriesListComponent } from './categories-list.component';
import { CategoriesEditComponent } from './categories-edit.component';
import { CategoriesListSortDirective } from './categories-list-sort.directive';
import { OriginatorGuard } from '../shared/originator.guard';
import { CategoriesApiEffects } from './state/categories-api.effects';
import { CategoriesPageReducer } from './state/categories.page.reducer';
import { CategoriesShellComponent } from './categories-shell.component';
import { CategoriesResolver } from '../shared/resolvers/categories.resolver';
import { CategoriesEntityReducer } from './state/categories.entity.reducer';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    SharedModule,
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('categoriesPage', CategoriesPageReducer),
    StoreModule.forFeature('categories',CategoriesEntityReducer),
    EffectsModule.forFeature([CategoriesApiEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: CategoriesShellComponent,
        resolve: {category: CategoriesResolver},
        canActivate: [ MsalGuard, OriginatorGuard]
      },
      {
        path: 'edit',
        component: CategoriesEditComponent,
        canActivate: [ OriginatorGuard ]
      }
    ])
  ],
  declarations: [
    CategoriesListComponent,
    CategoriesEditComponent,
    CategoriesShellComponent,
    CategoriesListSortDirective
  ],
})
export class CategoriesModule {}
