import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.column = {format: 'currency', avatar: 'avatar', field: 'test'};
    component.data = {test: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
