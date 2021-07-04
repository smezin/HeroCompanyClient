import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  @Input() username: string;
  @Input() password: string;
  @Input() rememberMe: boolean = true;
  
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  errorMessage: string;
  onSubmit(form: NgForm): void {
    if (!form.valid){
      return;
    }
    const name = form.value.username;
    const password = form.value.password;
    const rememberMe = form.value.rememberMe;
    this.isLoading = true;
    this.authService.login(name, password, rememberMe).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/myCards']);
    },
    error => {
      this.errorMessage = error.error.title || error.error;
      this.isLoading = false;
      throw new Error (error)      
      }
    );
    form.reset;
  }
}
