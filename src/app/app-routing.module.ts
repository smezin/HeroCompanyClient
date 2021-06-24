import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroCardsComponent } from './components/hero-cards/hero-cards.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full'},
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'myCards', component: HeroCardsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
