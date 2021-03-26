/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    queryCommand(): Chainable<any>;
    SetupInputFieldsCommand(): Chainable<any>;
    NavigateByTestIdCommand(testId: string): Chainable<any>;
  }
}
