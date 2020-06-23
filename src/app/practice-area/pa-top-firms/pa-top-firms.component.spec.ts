import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaTopFirmsComponent } from './pa-top-firms.component';

describe('PaTopFirmsComponent', () => {
  let component: PaTopFirmsComponent;
  let fixture: ComponentFixture<PaTopFirmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaTopFirmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaTopFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
