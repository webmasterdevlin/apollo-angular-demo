/// <reference types="cypress"/>

describe("Villains Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=more]").click();
    cy.get("[data-testid=nav-villains]").click();
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.SetupInputFieldsCommand();
  });

  it("should render villains", () => {
    cy.location("pathname").should("equal", "/villains");
    cy.get("[data-testid=card]").should("have.length", 4);
  });
});
