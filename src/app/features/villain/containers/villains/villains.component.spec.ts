import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";

import { SharedModule } from "src/app//shared/shared.module";

import { VillainService } from "src/app/features/villain/containers/villains/villain.service";
import { HEROES } from "src/app/mocks/mock-heroes";
import { VILLAINS } from "src/app/mocks/mock-villains";
import { fakeAsync } from "@angular/core/testing";
import { HeroService } from "src/app/features/hero/containers/heroes/hero.service";
import { VillainsComponent } from "./villains.component";

let spector: Spectator<VillainsComponent>;
const heroSvcSpy = jasmine.createSpyObj<HeroService>([
  "getHeroesQuery",
  "deleteHeroMutate",
  "addHeroMutate",
  "updateHeroMutate",
  "softDeleteHeroMutate",
]);
heroSvcSpy.getHeroesQuery.and.returnValue(
  of({
    data: {
      heroes: HEROES,
    },
  } as any)
);
const villainSvcSpy = jasmine.createSpyObj<VillainService>([
  "getVillainsQuery",
  "deleteVillainMutate",
  "addVillainMutate",
  "updateVillainMutate",
  "softDeleteVillainMutate",
]);
villainSvcSpy.getVillainsQuery.and.returnValue(
  of({
    data: {
      villains: VILLAINS,
    },
  } as any)
);

const createComponent = createComponentFactory({
  component: VillainsComponent,
  imports: [ReactiveFormsModule, SharedModule, RouterModule.forRoot([])],
  providers: [
    { provide: HeroService, useValue: heroSvcSpy },
    { provide: VillainService, useValue: villainSvcSpy },
  ],
});

describe("VillainsComponent", () => {
  it("should display the title", function () {
    spector = createComponent();
    const title = spector.query("h1");
    expect(title).toHaveText("Super Villains Page");
  });

  it("should render two villains", function () {
    spector = createComponent();
    const heroes = spector.queryAll("mat-card-title");
    expect(heroes).toHaveLength(2);
  });

  it("should delete a villain after clicking soft delete button", fakeAsync(() => {
    spector = createComponent();
    const buttons = spector
      .queryAll("button")
      .filter((b) => b.innerHTML.includes("SOFT DELETE"));
    expect(buttons).toHaveLength(2);
    spector.click(buttons[0]);
    spector.tick(6000);

    //TODO:
  }));
});
