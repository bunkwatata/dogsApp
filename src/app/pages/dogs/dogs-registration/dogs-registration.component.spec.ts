import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsRegistrationComponent } from './dogs-registration.component';

describe('DogsRegistrationComponent', () => {
  let component: DogsRegistrationComponent;
  let fixture: ComponentFixture<DogsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogsRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
