import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerFirmsModalComponent } from './peer-firms-modal.component';

describe('PeerFirmsModalComponent', () => {
  let component: PeerFirmsModalComponent;
  let fixture: ComponentFixture<PeerFirmsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeerFirmsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerFirmsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
