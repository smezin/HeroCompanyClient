import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HeroCard } from 'src/heroCard';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }
  private heroCardsUrl = environment.heroCardsUrl;
  
  getHeroCards() : Observable<HeroCard[]>   {    
    return this.http.get<HeroCard[]>(this.heroCardsUrl);
  }
}
