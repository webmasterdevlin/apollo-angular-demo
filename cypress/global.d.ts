/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    SetupInputFieldsCommand(): Chainable<any>;
    NavigateByTestIdCommand(testId: string): Chainable<any>;
  }
}
