import { Component, OnInit } from '@angular/core';
import { HeroCard } from './entities/heroCard';
import { HeroCardsDalService } from './services/hero-cards-dal.service';
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

  constructor (private seedDataService: SeedDataService, private heroCardsDalService: HeroCardsDalService) {}

  ngOnInit(): void {
    this.seedDataService.seedHeroCards();
    this.seedDataService.seedHeroTrainer();    
  }
}
