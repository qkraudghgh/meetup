import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainAppComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { AppRoutingModule } from './app-routing-module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { ServerService } from './server.service';
import { AuthRedirectComponent } from './redirect/auth-redirect.component';
import { EditComponent } from './edit/edit.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainAppComponent,
    CalendarComponent,
    DetailsComponent,
    CreateComponent,
    AuthRedirectComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DateTimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    ServerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
