import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsTotalItemComponent } from './es-total-item.component';

describe('EsTotalItemComponent', () => {
  let component: EsTotalItemComponent;
  let fixture: ComponentFixture<EsTotalItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsTotalItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsTotalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
