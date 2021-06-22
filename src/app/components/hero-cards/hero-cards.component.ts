import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroCard } from 'src/app/entities/heroCard';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {

  constructor(
    public heroService: HeroService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    
    if (!this.authService.user.value || !this.authService.user.value.token) {     
      this.router.navigate(['/signin']);     
    }

    this.heroService.getHeroCards()
      .subscribe(heroCards => {
        this.heroService.setHeroCards(heroCards);
    } );
  }
  onTrainHero () {
    console.log("training");
  }
}
