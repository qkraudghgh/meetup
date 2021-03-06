import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAppComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from './auth-guard.service';
import { AuthRedirectComponent } from './redirect/auth-redirect.component';
import { EditComponent } from './edit/edit.component';

const appRoutes: Routes = [
  { path: '', component: MainAppComponent },
  { path: 'auth', component: AuthRedirectComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
  { path: 'edit/:id', canActivate: [AuthGuard], component: EditComponent },
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
