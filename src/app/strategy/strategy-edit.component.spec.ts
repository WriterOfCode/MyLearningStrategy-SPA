import { InjectionToken } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store } from '@ngrx/store';
import { AlertsService } from '../shared/alerts/alerts.service';
import { PickListsService } from '../shared/services/pick-lists.service';

import { StrategyEditComponent } from './strategy-edit.component';

describe('StategyEditComponent', () => {
  let component: StrategyEditComponent;
  let fixture: ComponentFixture<StrategyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyEditComponent ],
      providers: [
        Store, StateObservable, StateObservable,
        ActionsSubject, ActionsSubject,ReducerManager,
        ReducerManager, ReducerManagerDispatcher, InjectionToken,
        PickListsService,
        Router,
        AlertsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
