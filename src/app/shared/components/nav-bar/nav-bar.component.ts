import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { HeroService } from "../../../features/hero/containers/heroes/hero.service";
import { catchError, finalize, map } from "rxjs/operators";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { of } from "rxjs";

@UntilDestroy()
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  totalHeroes = 0;
  totalVillains = 0;

  constructor(private apollo: Apollo, private heroService: HeroService) {}

  ngOnInit(): void {
    this.getTotalHeroes();
  }

  getTotalHeroes() {
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
