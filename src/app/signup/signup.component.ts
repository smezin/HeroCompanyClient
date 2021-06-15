import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  @Input() rePassword: string;
  @Input() rememberMe: boolean = true;

  constructor() { }
  
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.username, this.password, this.rePassword, this.rememberMe);
    this.password = "";
    this.rePassword = "";
  }
}
