import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { HeroesComponent } from "./heroes.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../../shared/shared.module";
import { HeroService } from "./hero.service";
import { of } from "rxjs";
import { VillainService } from "../../../villain/containers/villains/villain.service";

let spector: Spectator<HeroesComponent>;
const heroSvcSpy = jasmine.createSpyObj<HeroService>(["getHeroesQuery"]);
heroSvcSpy.getHeroesQuery.and.returnValue(
  of({
    data: {
      heroes: [
        {
          id: "9832gril",
          firstName: "Barry",
          lastName: "Allen",
          house: "DC",
          knownAs: "Flash",
        },
        {
          id: "78agWEy6fk",
          firstName: "Scott",
          lastName: "Summer",
          house: "Marvel",
          knownAs: "Cyclopes",
        },
      ],
    },
  } as any)
);
const villainSvcSpy = jasmine.createSpyObj<VillainService>([
  "getVillainsQuery",
]);
villainSvcSpy.getVillainsQuery.and.returnValue(
  of({
    data: {
      heroes: [
        {
          id: "9832gril",
          firstName: "Barry",
          lastName: "Allen",
          house: "DC",
          knownAs: "Flash",
        },
        {
          id: "78agWEy6fk",
          firstName: "Scott",
          lastName: "Summer",
          house: "Marvel",
          knownAs: "Cyclopes",
        },
      ],
    },
  } as any)
);

const createComponent = createComponentFactory({
  component: HeroesComponent,
  imports: [ReactiveFormsModule, SharedModule, RouterModule.forRoot([])],
  providers: [
    { provide: HeroService, useValue: heroSvcSpy },
    { provide: VillainService, useValue: villainSvcSpy },
  ],
});

describe("HeroesComponent", () => {
  it("should display the title", function () {
    spector = createComponent();
    const title = spector.query("h1");
    expect(title).toHaveText("Super Heroes Page");
  });

  it("should render two heroes", function () {
    spector = createComponent();
    const heroes = spector.queryAll("mat-card-title");
    expect(heroes).toHaveLength(2);
  });
});
