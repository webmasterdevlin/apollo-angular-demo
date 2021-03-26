import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { VillainService } from "./villain.service";
import { Villain } from "./villain.model";

@UntilDestroy()
@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"],
})
export class VillainsComponent implements OnInit {
  villains: Villain[];
  itemForm: FormGroup;
  editedForm: FormGroup;
  isLoading = false;
  editingTracker = "0";
  rates: any[];
  error: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private villainService: VillainService
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchVillains();
  }

  handleDeleteVillain(id: string) {
    this.villainService
      .deleteVillainMutate(id)
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  handleAddVillain() {
    this.villainService
      .addVillainMutate(this.itemForm.value)
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  handleUpdateVillain() {
    const editedVillain = this.editedForm.value;
    this.villainService
      .updateVillainMutate(editedVillain)
      .pipe(
        untilDestroyed(this),
        catchError((error) => of([]))
      )
      .subscribe();
  }

  handleSoftDeleteVillain(id: string) {
    this.villainService.softDeleteVillainMutate(id);
  }

  handleNavigateVillainDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
  }

  private fetchVillains() {
    this.villainService
      .getVillainsQuery()
      .pipe(
        untilDestroyed(this),
        map(({ data }) => (this.villains = data.villains)),
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
