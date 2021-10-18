import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditImageComponent } from './question-edit-image.component';

describe('QuestionEditImageComponent', () => {
  let component: QuestionEditImageComponent;
  let fixture: ComponentFixture<QuestionEditImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
