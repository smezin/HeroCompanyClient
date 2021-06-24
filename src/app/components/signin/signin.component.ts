import { Component, Input, OnInit } from '@angular/core';
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

  onSubmit(form: NgForm): void {
    if (!form.valid){
      return;
    }
    const name = form.value.username;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.login(name, password).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/myCards']);
    },
    error => {
      console.log("error:", error);
      this.isLoading = false;
    }
    );
  }
}
