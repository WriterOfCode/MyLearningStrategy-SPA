import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSharedComponent } from './subject-shared.component';

describe('SubjectSharedComponent', () => {
  let component: SubjectSharedComponent;
  let fixture: ComponentFixture<SubjectSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
