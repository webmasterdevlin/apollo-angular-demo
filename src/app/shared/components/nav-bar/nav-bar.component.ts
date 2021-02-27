import { Component, OnInit } from "@angular/core";
import { HeroService } from "src/app/features/hero/containers/heroes/hero.service";
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

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getTotalHeroes();
  }

  handleLoadCharacters() {
    this.heroService
      .getHeroesQuery()
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
}
