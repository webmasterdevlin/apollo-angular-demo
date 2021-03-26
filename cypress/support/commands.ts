// @ts-check
///<reference path="../global.d.ts" />
/// <reference types="cypress"/>
import "@cypress/code-coverage/support";
import "@testing-library/cypress/add-commands";

/*
 * NO STUBBING OF GRAPHQL QUERIES.
 * Use a test database to not complicate things
 * */

Cypress.Commands.add("SetupInputFieldsCommand", () => {
  cy.get("[data-testid=firstName]").as("FirstName");
  cy.get("[data-testid=lastName]").as("LastName");
  cy.get("[data-testid=house]").as("House");
  cy.get("[data-testid=knownAs]").as("KnownAs");
  cy.get("[data-testid=save-update-button]").as("SaveUpdate");
});
