import { Component, OnInit } from "@angular/core";
import { Hero } from "src/app/features/hero/containers/heroes/hero.model";
import { Villain } from "src/app/features/villain/containers/villains/villain.model";
import { HeroService } from "src/app/features/hero/containers/heroes/hero.service";
import { VillainService } from "src/app/features/villain/containers/villains/villain.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit {
  heroes: Hero[];
  villains: Villain[];

  constructor(
    private heroService: HeroService,
    private villainService: VillainService
  ) {}

  ngOnInit(): void {
    this.fetchHeroes();
    this.fetchVillains();
  }

  fetchHeroes() {
    this.heroService
      .getHeroesQuery()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.heroes = result?.data?.heroes;
      });
  }

  fetchVillains() {
    this.villainService
      .getVillainsQuery()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.villains = result?.data?.villains;
      });
  }
}
