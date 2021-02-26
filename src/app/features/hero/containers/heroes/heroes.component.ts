import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { GET_HEROES_QUERY } from "../../../../graphql/queries/hero.queries";

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
  loading = true;
  error: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.apollo
      .watchQuery({
        query: GET_HEROES_QUERY,
      })
      .valueChanges.subscribe((result: any) => {
        this.heroes = result?.data?.heroes;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  handleNavigateHeroDetail(id: string) {
    this.router.navigateByUrl("/heroes/hero-detail/" + id);
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
