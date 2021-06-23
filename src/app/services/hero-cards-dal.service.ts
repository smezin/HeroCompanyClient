import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HeroCard } from 'src/app/entities/heroCard';
import { HandleError } from './handle-error.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeroCardsDalService 
{
  heroCards: HeroCard[] = [];
  TrainerName: string;
  TraindId: string = '7d21479a-e2b9-b545-7031-03aec9c8f7bb';
  token: string;
  
  constructor(
    private http: HttpClient, 
    private handleErrorService: HandleError, 
    private authService: AuthService)
    { }

  private heroCardsUrl = environment.heroCardsUrl;
  
  updateHeroCard (trainerId: string, updatedHeroCard: HeroCard) : Observable<HeroCard> {
    console.log('--->',trainerId);
    return this.http.put<HeroCard>(`${this.heroCardsUrl}/${trainerId}`, updatedHeroCard);
  }
  getHeroCardsByTrainerId() : Observable<HeroCard[]>   {   
    return this.http.get<HeroCard[]>(`${this.heroCardsUrl}/byTrainerId/${this.TraindId}`);
  }    
  getHeroCardByName (heroName: string) : Observable<HeroCard> {
    return this.http.get<HeroCard>(`${this.heroCardsUrl}/ByHeroName/${heroName}`);
  }
  getHeroCardById (heroName: string) : Observable<HeroCard> {
    return this.http.get<HeroCard>(`${this.heroCardsUrl}/ByHeroId/${heroName}`);
  }
  setHeroCards(heroCards: HeroCard[]): void {
    this.heroCards = heroCards
  }  
  
}
