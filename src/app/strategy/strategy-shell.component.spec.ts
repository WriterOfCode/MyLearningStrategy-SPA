import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyShellComponent } from './strategy-shell.component';

describe('StrategyShellComponent', () => {
  let component: StrategyShellComponent;
  let fixture: ComponentFixture<StrategyShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
