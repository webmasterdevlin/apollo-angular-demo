/// <reference types="cypress"/>

describe("Heroes Page", () => {
  beforeEach(() => {
    cy.visit("/");
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.SetupInputFieldsCommand();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", 5);
  });
});
