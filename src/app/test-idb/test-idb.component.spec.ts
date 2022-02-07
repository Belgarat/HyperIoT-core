import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestIdbComponent } from './test-idb.component';

describe('TestIdbComponent', () => {
  let component: TestIdbComponent;
  let fixture: ComponentFixture<TestIdbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestIdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
