import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  name: string;
  id: string;
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.name = user ? user.name : "--";
      this.id = user ? user.id : "--";
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  
}
