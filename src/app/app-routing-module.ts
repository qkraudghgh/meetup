import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarAppComponent } from './calendar/calendar.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: CalendarAppComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
  { path: 'edit/:id', canActivate: [AuthGuard], component: CreateComponent },
  { path: '**', redirectTo: '' }, // handled to wrong url
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
