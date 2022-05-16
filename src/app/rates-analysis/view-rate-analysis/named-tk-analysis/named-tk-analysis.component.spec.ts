import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedTkAnalysisComponent } from './named-tk-analysis.component';

describe('NamedTkAnalysisComponent', () => {
  let component: NamedTkAnalysisComponent;
  let fixture: ComponentFixture<NamedTkAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedTkAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedTkAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
