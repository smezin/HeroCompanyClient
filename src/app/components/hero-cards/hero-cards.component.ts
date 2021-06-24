import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroCard } from 'src/app/entities/heroCard';
import { AuthService } from 'src/app/services/auth.service';
import { HeroCardsDalService } from 'src/app/services/hero-cards-dal.service';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {
  heroCards: HeroCard[] = [];
  constructor(
    public heroCardsDalService: HeroCardsDalService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getCards();      
  }
  onTrainHero (id: string) : void{
    this.heroCardsDalService.getHeroCardById(id).subscribe(hero => 
      {
        const newPower: number = +(hero.currentPower * (1 + Math.random()/10)).toFixed(2);
        const updatedHeroCard : HeroCard = {...hero, currentPower: newPower}
        this.heroCardsDalService.updateHeroCard(this.authService.user.value.id, updatedHeroCard).subscribe(); 
        const index = this.heroCards.findIndex(hc => hc.id === id);
        this.heroCards[index] = updatedHeroCard;  
        this.sortHeroCards();          
      }
    );   
  }

  private getCards () {
    this.heroCardsDalService.getHeroCardsByTrainerId(this.authService.user.value.id)
    .subscribe(heroCards => {
      this.heroCards = heroCards
      this.sortHeroCards();
    });
  }
  //sort by current power, desending
  private sortHeroCards() {
    this.heroCards.sort((a, b) => {
      return +b.currentPower - +a.currentPower;
    });
  }
}
