import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule,
  MatSlideToggleModule, MatSortModule, MatTableModule
} from '@angular/material';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {MomentModule} from 'angular2-moment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatRadioModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
