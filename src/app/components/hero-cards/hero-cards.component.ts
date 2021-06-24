import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HeroCardsDalService } from 'src/app/services/hero-cards-dal.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {


  constructor(
    public heroCardsDalService: HeroCardsDalService, 
    private authService: AuthService, 
    private router: Router,
    private trainingService: TrainingService) { }

  ngOnInit(): void {
    if (!this.authService.user.value || !this.authService.user.value.token) {     
      this.router.navigate(['/signin']);   
      return;  
    }

    this.heroCardsDalService.getHeroCardsByTrainerId(this.authService.user.value.id)
      .subscribe(heroCards => {
        this.heroCardsDalService.setHeroCards(heroCards);
    } );
  }
  onTrainHero (id: string) {
    console.log("training");
    this.trainingService.trainHero(id,'');
  }
}
