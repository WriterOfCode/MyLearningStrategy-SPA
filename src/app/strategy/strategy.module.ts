import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { MaterialModule } from '../material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StrategyListComponent } from './strategy-list.component';
import { StrategyEditComponent } from './strategy-edit.component';
import { StrategyListSortDirective } from './strategy-list-sort.directive';
import { OriginatorGuard } from '../shared/originator.guard';
import { StrategyApiEffects } from './state/strategy-api.effects';
import { StrategyPageReducer } from './state/strategy.page.reducer';
import { StrategyShellComponent } from './strategy-shell.component';
import { StrategyResolver } from '../shared/resolvers/strategy.resolver';
import { StrategiesEntityReducer } from './state/strategy.entity.reducer';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    SharedModule,
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('strategyPage', StrategyPageReducer),
    StoreModule.forFeature('strategies',StrategiesEntityReducer),
    EffectsModule.forFeature([StrategyApiEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: StrategyShellComponent,
        resolve: {strategy: StrategyResolver},
        canActivate: [MsalGuard, OriginatorGuard]
      },
      {
        path: 'edit',
        component: StrategyEditComponent,
        canActivate: [ OriginatorGuard ]
      }
    ])
  ],
  declarations: [
    StrategyListComponent,
    StrategyEditComponent,
    StrategyShellComponent,
    StrategyListSortDirective
  ]
})
export class StrategyModule { }
