import { initial } from "lodash";

describe("Photo Details", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should display some photos", () => {
    cy.getByDataTest("photo-list-item").should("have.length.greaterThan", 0);
  });

  it("should display a photos details", () => {
    cy.getByDataTest("search-input")
      .type("Valera Evane")
      .then((photos) => {
        cy.getByDataTest("photo-list-item").should("have.length", 1);
        cy.getByDataTest("photo-list-item")
          .first()
          .click()
          .then((photo) => {
            cy.getByDataTest("nav-back-link").should("exist");
            cy.get("h1").contains(
              "portrait of blonde woman wearing sunglasses "
            );

            cy.getByDataTest("photographer-name").should(
              "include.text",
              "Valera Evane"
            );

            cy.getByDataTest("nav-back-link")
              .click()
              .then((photos) => {
                cy.getByDataTest("photo-list-item").should(
                  "have.length.greaterThan",
                  1
                );
              });
          });
      });
  });
});
