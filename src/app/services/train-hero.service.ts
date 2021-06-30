import { Injectable } from '@angular/core';
import { HeroCard } from '../entities/heroCard';
import { AuthService } from './auth.service';
import { HeroCardsDalService } from './hero-cards-dal.service';

@Injectable({
  providedIn: 'root'
})
export class TrainHeroService {
  updatedHeroCard : HeroCard = null;
  constructor(
    private heroCardsDalService: HeroCardsDalService,
    private authService: AuthService) { }

  trainHero (hero: HeroCard) : HeroCard {    
    if (hero !== null && hero.stamina <= 0) {
      return ({...hero, stamina: 0});
    }
    const newPower: number = +(hero.currentPower * (1 + Math.random()/10)).toFixed(2);
    return ({...hero, currentPower: newPower, stamina: hero.stamina-1});
  }
}
