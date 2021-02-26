import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { GET_HEROES_QUERY } from "../../../../graphql/queries/hero.queries";
import { catchError, finalize, tap } from "rxjs/operators";
import { of } from "rxjs";
import { DELETE_A_HERO } from "../../../../graphql/mutations/hero.mutations";
import { HeroService } from "./hero.service";

@UntilDestroy()
@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  heroes: any[];
  itemForm: FormGroup;
  editedForm: FormGroup;
  isLoading = false;
  editingTracker = "0";
  rates: any[];
  error: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchHeroes();
  }

  handleDeleteHero(id: string) {
    this.isLoading = true;
    this.heroService
      .deleteHeroMutate(id)
      .pipe(
        untilDestroyed(this),
        tap(() => (this.heroes = this.heroes.filter((h) => h.id != id))),
        catchError((error) => of([])),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  handleAddHero() {
    this.isLoading = true;
    this.heroService
      .addHeroMutate(this.itemForm.value)
      .pipe(
        untilDestroyed(this),
        tap((result: any) => {
          this.heroes = [
            ...this.heroes,
            result.data.insert_heroes.returning[0],
          ];
          this.isLoading = result.loading;
          this.error = result.error;
        }),
        catchError((error) => of([])),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  handleUpdateHero() {
    const editedHero = this.editedForm.value;
    this.isLoading = true;
    this.heroService
      .updateHeroMutate(editedHero)
      .pipe(
        untilDestroyed(this),
        tap(
          () =>
            (this.heroes = this.heroes.map((h) =>
              h.id === editedHero.id ? editedHero : h
            ))
        ),
        catchError((error) => of([])),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  handleSoftDeleteHero(id: string) {}

  handleNavigateHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
  }

  private fetchHeroes() {
    this.heroService
      .getHeroesQuery()
      .pipe(
        untilDestroyed(this),
        tap((result) => {
          this.heroes = result?.data?.heroes;
          this.isLoading = result.loading;
          this.error = result.error;
        }),
        catchError((error) => of([])),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""],
    });
  }
}
