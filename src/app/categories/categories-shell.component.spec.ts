import { DebugElement, InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store } from '@ngrx/store';
import { CategoriesShellComponent } from './categories-shell.component';
import { CategoriesStoreState } from './state/categories.selectors';

describe('CategoriesShellComponent', () => {
  let component: CategoriesShellComponent;
  let fixture: ComponentFixture<CategoriesShellComponent>;
  let del: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesShellComponent ],
      providers: [         Store, StateObservable, StateObservable,
        ActionsSubject, ActionsSubject,ReducerManager,
        ReducerManager, ReducerManagerDispatcher, InjectionToken, ]
    })
    .compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(CategoriesShellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      del = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
