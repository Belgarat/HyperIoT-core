import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceTestComponent } from './service-test.component';

describe('TestComponent', () => {
  let component: ServiceTestComponent;
  let fixture: ComponentFixture<ServiceTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
