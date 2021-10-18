import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussyIndicatorComponent } from './bussy-indicator.component';

describe('BussyIndicatorComponent', () => {
  let component: BussyIndicatorComponent;
  let fixture: ComponentFixture<BussyIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BussyIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
