import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeroCardsComponent } from './components/hero-cards/hero-cards.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { HandleError } from './services/handle-error.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    HeroCardsComponent,
    TrainerDetailsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [    
  {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi   : true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HandleError,
    multi: true
  },
  {
    provide: ErrorHandler, 
    useClass: HandleError
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
