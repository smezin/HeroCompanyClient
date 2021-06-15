import { Component, Input, OnInit } from '@angular/core';
import { HeroCard } from 'src/heroCard';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;
  @Input() rememberMe: boolean = true;
  heroes : HeroCard[];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroCards().subscribe(hero => console.log(hero));
  }
  onSubmit():void {
    console.log(this.username, this.password, this.rememberMe);
    this.password = "";

  }

}
