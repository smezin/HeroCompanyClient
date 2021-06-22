import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeroTrainer } from '../entities/heroTrainer';
import { Guid } from "guid-typescript";
import { HeroCard } from '../entities/heroCard';
import { Observable } from 'rxjs';
import { ability } from '../entities/ability';

@Injectable({
  providedIn: 'root'
})
export class SeedDataService {

  constructor(private http: HttpClient) { }

  private heroTrainerUrl = environment.heroTrainerUrl;  
  private heroCardsUrls = environment.heroCardsUrl;
  private id: string = '7d21479a-e2b9-b545-7031-03aec9c8f7bb'; //Guid.create().toString();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  heroTrainer: HeroTrainer = {
    name: 'Willie',
    id: this.id
  }  
  heroCard1: HeroCard = {
    name: 'one',
    id: Guid.create().toString(),
    myTrainerId: this.id,
    startingPower: 10,
    currentPower: 20,
    trainingSince: new Date(),
    ability: ability.Attacker,
    suitColors: '#EB0A77'
  }
  heroCard2: HeroCard = {
    name: 'two',
    id: Guid.create().toString(),
    myTrainerId: this.id,
    startingPower: 20,
    currentPower: 30,
    trainingSince: new Date(),
    ability: ability.Defender,
    suitColors: '#00A999'
  }
  heroCard3: HeroCard = {
    name: 'three',
    id: Guid.create().toString(),
    myTrainerId: this.id,
    startingPower: 20,
    currentPower: 30,
    trainingSince: new Date(),
    ability: ability.Defender,
    suitColors: '#2400A2'
  }
  heroCards: HeroCard[] = [
    this.heroCard1, this.heroCard2, this.heroCard3
  ];
  
  seedHeroTrainer (): HeroTrainer
  {    
    var heroTrainer: HeroTrainer;
    this.http.post<HeroTrainer>(this.heroTrainerUrl, this.heroTrainer, this.httpOptions)
      .subscribe(ht => heroTrainer = ht);
    return heroTrainer;
  }
  seedHeroCard (heroCard: HeroCard): Observable<HeroCard> 
  {
    return this.http.post<HeroCard>(this.heroCardsUrls, heroCard, this.httpOptions);
  }
  seedHeroCards (): HeroCard[]
  {
    var heroCards: HeroCard[] = [];
    this.heroCards.forEach(heroCard => {
      this.seedHeroCard(heroCard).subscribe(h => heroCards.push(h))
    })
    return heroCards;
  }

}
