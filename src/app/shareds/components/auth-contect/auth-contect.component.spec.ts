import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContectComponent } from './auth-contect.component';

describe('AuthContectComponent', () => {
  let component: AuthContectComponent;
  let fixture: ComponentFixture<AuthContectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthContectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthContectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
