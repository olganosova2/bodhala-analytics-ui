import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRateBenchmarkComponent } from './add-rate-benchmark.component';

describe('AddRateBenchmarkComponent', () => {
  let component: AddRateBenchmarkComponent;
  let fixture: ComponentFixture<AddRateBenchmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRateBenchmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRateBenchmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
