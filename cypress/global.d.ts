/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    queryCommand(): void;
    SetupInputFieldsCommand(): void;
    NavigateByTestIdCommand(testId: string): void;
  }
}
