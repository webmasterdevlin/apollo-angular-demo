import { Component, OnInit } from "@angular/core";
import { Hero } from "src/app/features/hero/containers/heroes/hero.model";
import { HeroService } from "src/app/features/hero/containers/heroes/hero.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit {
  heroes: Hero[];
  villains: any;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.fetchHeroes();
  }

  fetchHeroes() {
    this.heroService
      .getHeroesQuery()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.heroes = result?.data?.heroes;
      });
  }
}
