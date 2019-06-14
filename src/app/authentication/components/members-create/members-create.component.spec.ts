import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersCreateComponent } from './members-create.component';

describe('MembersCreateComponent', () => {
  let component: MembersCreateComponent;
  let fixture: ComponentFixture<MembersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
