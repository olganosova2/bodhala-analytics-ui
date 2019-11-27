import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../../shared/unit-tests/mock-app.imports';
import { PillComponent } from './pill.component';

describe('PillComponent', () => {
  let component: PillComponent;
  let fixture: ComponentFixture<PillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: [...DECLARATIONS, PillComponent],
      providers: PROVIDERS,
      schemas: SCHEMAS
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillComponent);
    component = fixture.componentInstance;
    component.column = {format: 'currency', avatar: 'avatar', field: 'test'};
    component.data = {test: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
