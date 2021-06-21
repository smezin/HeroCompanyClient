import { Component, Input, OnInit } from '@angular/core';
import { HeroCard } from 'src/app/entities/heroCard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  @Input() rememberMe: boolean = true;
  isLoading: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  
  }
  onSubmit():void {   
   
  }

}
