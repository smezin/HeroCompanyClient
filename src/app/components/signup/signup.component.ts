import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  @Input() rememberMe: boolean = true;
  @Input() rePassword: string;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  }
  onSubmit(form: NgForm): void {
    if (!form.valid){
      return;
    }
    const name = form.value.username;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.signup(name, password).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/myCards']);
    });
    //form.reset;
  }
}
