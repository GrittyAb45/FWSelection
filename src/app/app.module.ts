import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainDataComponent } from './duckfeeddata/main-data.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
         MatInputModule,
         MatExpansionModule,
         MatFormFieldModule,
         MatSelectModule,
         MatCheckboxModule
       } from '@angular/material';

import { MatCardModule,
         MatButtonModule,
         MatToolbarModule } from '@angular/material';
import { CountrySelectService } from './country-select.service';
import { DuckFeedService } from './feeds.services';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HandleDuckFeedService } from './handle-duck-feed.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainDataComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CountrySelectService, DuckFeedService, HandleDuckFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
