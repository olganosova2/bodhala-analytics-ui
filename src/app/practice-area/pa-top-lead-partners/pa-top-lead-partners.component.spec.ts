import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaTopLeadPartnersComponent } from './pa-top-lead-partners.component';

describe('PaTopLeadPartnersComponent', () => {
  let component: PaTopLeadPartnersComponent;
  let fixture: ComponentFixture<PaTopLeadPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaTopLeadPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaTopLeadPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
