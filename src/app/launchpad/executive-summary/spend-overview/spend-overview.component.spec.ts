import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendOverviewComponent } from './spend-overview.component';

describe('SpendOverviewComponent', () => {
  let component: SpendOverviewComponent;
  let fixture: ComponentFixture<SpendOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
