import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalendarAppComponent } from './calendar/calendar.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { AppRoutingModule } from './app-routing-module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { ServerService } from './server.service';
import { AuthRedirectComponent } from './redirect/auth-redirect.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CalendarAppComponent,
        CalendarComponent,
        DetailsComponent,
        CreateComponent,
        AuthRedirectComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        DateTimePickerModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ServerService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
