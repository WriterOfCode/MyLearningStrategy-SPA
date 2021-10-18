import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseEditImageComponent } from './response-edit-image.component';

describe('ResponseEditImageComponent', () => {
  let component: ResponseEditImageComponent;
  let fixture: ComponentFixture<ResponseEditImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseEditImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
