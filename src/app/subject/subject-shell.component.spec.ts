import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectShellComponent } from './subject-shell.component';

describe('SubjectShellComponent', () => {
  let component: SubjectShellComponent;
  let fixture: ComponentFixture<SubjectShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
