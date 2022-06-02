/// <reference types="cypress"/>

describe("Villains Page", () => {
  beforeEach(() => {
    cy.visit("/");
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.SetupInputFieldsCommand();
  });

  it("should render villains", () => {
    cy.get("[data-testid=more]").click();
    cy.get("[data-testid=nav-villains]").click();
    cy.location("pathname").should("equal", "/villains");
    cy.get("[data-testid=card]").should("have.length", 5);
  });

  context("Villain's detail", () => {
    it("should navigate to villain's detail after clicking a detail button", () => {
      cy.get("[data-testid=detail-button]").eq(1).click();
      cy.location("pathname").should("contain", "/villain-detail/");
    });
  });

  context("Add a new villain", () => {
    it("should create a new villain after filling out the form", () => {
      const firstName = "Bucky";
      const lastName = "Barnes";
      const house = "Marvel";
      const knownAs = "The Winter Soldier";

      cy.get("@FirstName").type(firstName);
      cy.get("@LastName").type(lastName);
      cy.get("@House").type(house);
      cy.get("@KnownAs").type(knownAs);

      cy.get("@SaveUpdate").click();

      cy.get("[data-testid=card]").should("have.length", 6);
      cy.get("[data-testid=villain-chip]").should("have.length", 6);

      cy.get("[data-testid=total-villains]").contains(6);
    });
  });

  context("Update an existing villain", () => {
    it("should go back to rows of villains and not update villain whe cancel is clicked", () => {
      const index = 5;
      const editedFirstName = "edited";

      cy.get("[data-testid=edit-button]").eq(index).click();
      cy.get("@FirstName").type(editedFirstName);

      cy.get("[data-testid=cancel-button]").click();
      cy.get("[data-testid=card-title]")
        .eq(index)
        .should("not.have.value", "edited");
    });

    it("should update an existing villain", () => {
      const index = 5;
      const editedFirstName = "edited";

      cy.get("[data-testid=edit-button]").eq(index).click();
      cy.get("@FirstName").clear().type(editedFirstName);

      cy.get("@SaveUpdate").click();
      cy.get("[data-testid=cancel-button]").click();
      cy.wait(1000);
      cy.get("[data-testid=card-title]").eq(index).should("contain", "edited");
    });
  });

  context("Soft delete a villain", () => {
    it("should remove temporarily a card after clicking a soft-delete button", () => {
      const index = 5;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", 5);
    });

    it("should remove temporarily a chip after clicking a soft-delete button", () => {
      const index = 5;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=villain-chip]").should("have.length", 5);
    });

    it("should deduct 1 temporarily from the total villains after clicking a soft-delete button", () => {
      const index = 5;
      cy.get("[data-testid=soft-delete-button]").eq(index).click();
      cy.get("[data-testid=total-villains]").should("contain", 5);
    });
  });

  context("Delete a villain", () => {
    it("should remove a card after clicking a delete button", () => {
      const index = 5;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", 5);
      cy.get("[data-testid=villain-chip]").should("have.length", 5);
      cy.get("[data-testid=total-villains]").should("contain", 5);
    });
  });
});
