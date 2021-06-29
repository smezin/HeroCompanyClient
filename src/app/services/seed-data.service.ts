import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeroTrainer } from '../entities/heroTrainer';
import { Guid } from "guid-typescript";
import { HeroCard } from '../entities/heroCard';
import { Observable } from 'rxjs';
import { ability } from '../entities/ability';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SeedDataService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private heroCardsUrls = environment.heroCardsUrl;
  private id: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  heroTrainer: HeroTrainer = {
    name: 'Willie',
    id: '',
    password: 'popoXima1!'
  }  
  heroCard1: HeroCard = {
    name: 'Reef',
    id: Guid.create().toString(),
    myTrainerId: '',
    startingPower: 10,
    currentPower: 40,
    trainingSince: new Date(),
    ability: ability.Attacker,
    suitColors: '#EB0A77, #2400A2, #ffff00, #00ff00'
  }
  heroCard2: HeroCard = {
    name: 'Yam',
    id: Guid.create().toString(),
    myTrainerId: '',
    startingPower: 20,
    currentPower: 30,
    trainingSince: new Date(),
    ability: ability.Defender,
    suitColors: '#00A999'
  }
  heroCard3: HeroCard = {
    name: 'Liat',
    id: Guid.create().toString(),
    myTrainerId: '',
    startingPower: 20,
    currentPower: 20,
    trainingSince: new Date(),
    ability: ability.Defender,
    suitColors: '#2400A2, #00A999'
  }
  heroCards: HeroCard[] = [
    this.heroCard1, this.heroCard2, this.heroCard3
  ];
  
  seedHerosAndTrainer (): void
  {    
    this.authService.signup(this.heroTrainer.name, this.heroTrainer.password)
    .subscribe(t => {
      this.heroCards.forEach(hc => {
        hc.myTrainerId = t.id;
        this.seedHeroCard(hc).subscribe();
      });
    });
  }

  private seedHeroCard (heroCard: HeroCard): Observable<HeroCard> 
  {
    return this.http.post<HeroCard>(this.heroCardsUrls, heroCard, this.httpOptions);
  }

}
