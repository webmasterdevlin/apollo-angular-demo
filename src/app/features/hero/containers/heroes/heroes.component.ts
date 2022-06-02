import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { HeroService } from "./hero.service";
import { Hero } from "./hero.model";

@UntilDestroy()
@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  itemForm: UntypedFormGroup;
  editedForm: UntypedFormGroup;
  isLoading = false;
  editingTracker = "0";
  rates: any[];
  error: any;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchHeroes();
  }

  handleDeleteHero(id: string) {
    this.heroService
      .deleteHeroMutate(id)
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  handleAddHero() {
    this.heroService
      .addHeroMutate(this.itemForm.value)
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  handleUpdateHero() {
    const editedHero = this.editedForm.value;
    this.heroService
      .updateHeroMutate(editedHero)
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  handleSoftDeleteHero(id: string) {
    this.heroService.softDeleteHeroMutate(id);
  }

  handleNavigateHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private fetchHeroes() {
    this.heroService
      .getHeroesQuery()
      .pipe(
        untilDestroyed(this),
        map(({ data }) => (this.heroes = data.heroes)),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      house: [""],
      knownAs: [""],
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      house: [""],
      knownAs: [""],
    });
  }
}
