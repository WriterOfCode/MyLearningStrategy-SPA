import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSharedShellComponent } from './subject-shared-shell.component';

describe('SubjectSharedShellComponent', () => {
  let component: SubjectSharedShellComponent;
  let fixture: ComponentFixture<SubjectSharedShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectSharedShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSharedShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
