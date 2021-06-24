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
  constructor(
    private http: HttpClient, 
    private handleErrorService: HandleError, 
    private authService: AuthService)
    { }

  private heroCardsUrl = environment.heroCardsUrl;
  
  updateHeroCard (trainerId: string, updatedHeroCard: HeroCard) : Observable<HeroCard> {
    return this.http.put<HeroCard>(`${this.heroCardsUrl}/${trainerId}`, updatedHeroCard);
  }
  getHeroCardsByTrainerId(id: string) : Observable<HeroCard[]>   {   
    return this.http.get<HeroCard[]>(`${this.heroCardsUrl}/byTrainerId/${id}`);
  }    
  getHeroCardByName (heroName: string) : Observable<HeroCard> {
    return this.http.get<HeroCard>(`${this.heroCardsUrl}/ByHeroName/${heroName}`);
  }
  getHeroCardById (heroName: string) : Observable<HeroCard> {
    return this.http.get<HeroCard>(`${this.heroCardsUrl}/ByHeroId/${heroName}`);
  }
}
