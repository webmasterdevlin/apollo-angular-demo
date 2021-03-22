// @ts-check
///<reference path="../global.d.ts" />
/// <reference types="cypress"/>
import "@cypress/code-coverage/support";
import "@testing-library/cypress/add-commands";
import { v4 as uuidv4 } from "uuid";

Cypress.Commands.add("SetupInputFieldsCommand", () => {
  cy.get("[data-testid=firstName]").as("FirstName");
  cy.get("[data-testid=lastName]").as("LastName");
  cy.get("[data-testid=house]").as("House");
  cy.get("[data-testid=knownAs]").as("KnownAs");
  cy.get("[data-testid=save-character]").as("Save");
});
