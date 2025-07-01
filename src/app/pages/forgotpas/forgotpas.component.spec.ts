import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasComponent } from './forgotpas.component';

describe('ForgotpasComponent', () => {
  let component: ForgotpasComponent;
  let fixture: ComponentFixture<ForgotpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotpasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
