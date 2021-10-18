import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditInfoComponent } from './question-edit-info.component';

describe('QuestionEditInfoComponent', () => {
  let component: QuestionEditInfoComponent;
  let fixture: ComponentFixture<QuestionEditInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
