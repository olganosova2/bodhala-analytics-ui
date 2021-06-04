import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishCheckboxComponent } from './publish-checkbox.component';
import {DECLARATIONS, IMPORTS, PROVIDERS, SCHEMAS} from '../../../shared/unit-tests/mock-app.imports';
import {AppStateService, HttpService} from 'bodhala-ui-common';
import * as mockServices from '../../../shared/unit-tests/mock-services';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';


describe('PublishCheckboxComponent', () => {
  let component: PublishCheckboxComponent;
  let fixture: ComponentFixture<PublishCheckboxComponent>;
  const params = {
    value: true,
    column: {
      colId: null
    },
    data: {
      id: 1
    }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: IMPORTS,
      declarations: DECLARATIONS,
      providers: PROVIDERS,
      schemas: SCHEMAS
    }).overrideComponent(PublishCheckboxComponent, {
      set: {
        providers: [
          AppStateService,
          {provide: HttpService, useClass: mockServices.DataStub}
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishCheckboxComponent);
    component = fixture.componentInstance;
    component.params = params;
    fixture.detectChanges();
  });

  it('should create PublishCheckboxComponent', () => {
    component.agInit({value: true});
    expect(component).toBeTruthy();
  });

  it('should refresh PublishCheckboxComponent', () => {
    const result = component.refresh({value: true});
    expect(result).toBeFalsy();
  });

  it('should afterGuiAttached PublishCheckboxComponent', () => {
    component.afterGuiAttached();
    expect(component).toBeTruthy();
  });

  it('should openModal CreateClientRecommendationsComponent', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    try {
      component.openPublishDialog(true);
      component.openPublishDialog(false);
    } catch (err) {
    }
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // it('should openModal w/ No CreateClientRecommendationsComponent', () => {
  //   spyOn(component.dialog, 'open').and.callThrough();
  //   try {
  //     component.openPublishDialog(true);
  //     component.openPublishDialog(false);
  //   } catch (err) {
  //   }
  //   expect(component.dialog.open).toHaveBeenCalled();
  // });

  it('should publishReport PublishCheckboxComponent', () => {
    component.publishReport();
    expect(component).toBeTruthy();
  });

});
