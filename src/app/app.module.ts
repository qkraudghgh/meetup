import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import { MaterialModule } from '@angular/material';
import { DateTimePickerModule } from 'ng-pick-datetime';

import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalendarAppComponent } from './calendar/calendar.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { AppRoutingModule } from './app-routing-module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarAppComponent,
    CalendarComponent,
    DetailsComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DateTimePickerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
