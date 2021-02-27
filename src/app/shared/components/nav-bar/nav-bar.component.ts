import { Component, OnInit } from "@angular/core";
import { HeroService } from "src/app/features/hero/containers/heroes/hero.service";
import { VillainService } from "src/app/features/villain/containers/villains/villain.service";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  totalHeroes = 0;
  totalVillains = 0;

  constructor(
    private heroService: HeroService,
    private villainService: VillainService
  ) {}

  ngOnInit(): void {
    this.getTotalHeroes();
    this.getTotalVillains();
  }

  handleLoadCharacters() {
    this.heroService
      .getHeroesQuery()
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();

    this.villainService
      .getVillainsQuery()
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  private getTotalHeroes() {
    this.heroService
      .getHeroesQuery()
      .pipe(
        untilDestroyed(this),
        map(({ data }) => (this.totalHeroes = data.heroes.length)),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  private getTotalVillains() {
    this.villainService
      .getVillainsQuery()
      .pipe(
        untilDestroyed(this),
        map(({ data }) => (this.totalVillains = data.villains.length)),
        catchError((error) => of([]))
      )
      .subscribe();
  }
}
