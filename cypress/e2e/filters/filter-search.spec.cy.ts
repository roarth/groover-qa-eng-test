import { initial } from "lodash";

describe("Filter Search", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should display the search filter correctly", () => {
    cy.getByDataTest("filters-form-label").should("exist");
    cy.getByDataTest("search-input").should("exist");
  });

  it("should apply the search filter when filled", () => {
    // Testing cyrillic alphabet too
    const PHOTOGRAPHERS = ["Regina", "Диана"];
    let initialPhotoCount: number = 0;

    for (const photographer of PHOTOGRAPHERS) {
      cy.getByDataTest("photo-list-item")
        .should("have.length.greaterThan", 0)
        .then((photos) => {
          initialPhotoCount = photos.length;
          cy.getByDataTest("search-input").type(photographer);

          cy.getByDataTest("photo-list-item").should(
            "not.equal",
            initialPhotoCount
          );

          cy.getByDataTest("photographer-link").should(
            "include.text",
            photographer
          );
        });
      cy.get("#search-input").clear();
    }
  });

  it("should apply the search filter when filled with invalid search", () => {
    let initialPhotoCount: number = 0;
    const SEARCH_STRING = "foo";

    cy.getByDataTest("photo-list-item")
      .should("have.length.greaterThan", 0)
      .then((photos) => {
        initialPhotoCount = photos.length;
        cy.getByDataTest("search-input").type(SEARCH_STRING);

        cy.getByDataTest("photo-list-item").should("not.exist");

        cy.getByDataTest("empty-list").should(
          "include.text",
          "No photos match your search criteria"
        );
      });
  });
});
