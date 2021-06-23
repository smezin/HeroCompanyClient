import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeroCard } from '../entities/heroCard';
import { AuthService } from './auth.service';
import { HeroCardsDalService } from './hero-cards-dal.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService implements OnInit, OnDestroy{
  trainerId: string;
  userSub: Subscription;
  constructor(
    private heroCardsDalService: HeroCardsDalService, 
    private authService: AuthService) { }

    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {        
        this.trainerId = user ? user.id : "--";
        console.log(user.id);
      });
    }
    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }

  trainHero (heroId: string, trainerId: string) : void{
    this.heroCardsDalService.getHeroCardById(heroId).subscribe(hero => 
      {
        console.log("trainerID", this.authService.user.value.id);
        var newPower: number = +hero.currentPower * 2;
        console.log(newPower)
        var updatedHeroCard : HeroCard = {...hero, currentPower: newPower}
        this.heroCardsDalService.updateHeroCard(this.authService.user.value.id, updatedHeroCard).subscribe(h => console.log(h));
      });
  }
}
