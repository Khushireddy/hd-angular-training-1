import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'search', component: SearchPageComponent, canActivate:[ AuthGuard ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
