import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaTopMattersComponent } from './pa-top-matters.component';

describe('PaTopMattersComponent', () => {
  let component: PaTopMattersComponent;
  let fixture: ComponentFixture<PaTopMattersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaTopMattersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaTopMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
