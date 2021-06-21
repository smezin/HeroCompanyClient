import { Component, OnInit } from '@angular/core';
import { HeroCard } from 'src/app/entities/heroCard';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {

  constructor(public heroService: HeroService) { }
  ngOnInit(): void {
    this.heroService.getHeroCards()
      .subscribe(heroCards => {
        this.heroService.setHeroCards(heroCards);
    } );
  }
}
