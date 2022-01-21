import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRateBenchmarksComponent } from './admin-rate-benchmarks.component';

describe('AdminRateBenchmarksComponent', () => {
  let component: AdminRateBenchmarksComponent;
  let fixture: ComponentFixture<AdminRateBenchmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRateBenchmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRateBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
