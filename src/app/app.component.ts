import { Component, OnInit } from '@angular/core';
import { HeroCard } from './entities/heroCard';
import { AuthService } from './services/auth.service';
import { SeedDataService } from './services/seed-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'HeroCompany';
  heroCards: HeroCard[] = [];

  constructor (
    private seedDataService: SeedDataService, 
    private authService: AuthService) {}
    

  ngOnInit(): void {
    this.seedDataService.seedHerosAndTrainer(); 
    if (localStorage.getItem('user')) {
      this.authService.user.next(JSON.parse(localStorage.getItem('user')));
    }  
    
  }
}
