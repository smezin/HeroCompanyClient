import { Component, OnInit } from '@angular/core';
import { HeroCard } from './entities/heroCard';
import { HeroService } from './services/hero.service';
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

  constructor (private seedDataService: SeedDataService, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroCards()
      .subscribe(heroCards => {
        this.heroService.setHeroCards(heroCards);
        if (this.heroService.heroCards.length === 0) {
          this.seedDataService.seedHeroCards();
        }
    } );
    //this.seedDataService.seedHeroTrainer();    
  }
}
