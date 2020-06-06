import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChangePasswordComponent } from './login-change-password.component';

describe('LoginChangePasswordComponent', () => {
  let component: LoginChangePasswordComponent;
  let fixture: ComponentFixture<LoginChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
