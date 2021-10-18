import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseEditInfoComponent } from './response-edit-info.component';

describe('ResponseEditInfoComponent', () => {
  let component: ResponseEditInfoComponent;
  let fixture: ComponentFixture<ResponseEditInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
