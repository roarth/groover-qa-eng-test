import { initial } from "lodash";

describe("Filter Color", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should display the color filter correctly", () => {
    cy.getByDataTest("filters-form-label").should("exist");
    cy.getByDataTest("color-input").should("exist");
  });

  it("should filter by color correctly", () => {
    const colorsToMatch = [
      {
        color: "#822017",
        matchCount: 2,
        photographersRegexp: /(Dagmara|Daria)\b/,
      },
      {
        color: "#8897c0",
        matchCount: 3,
        photographersRegexp: /(Sunsetoned|başaran|Alina)\b/,
      },
    ];

    colorsToMatch.forEach((color) => {
      cy.getByDataTest("color-input")
        .click()
        .invoke("val", color.color)
        .trigger("input");

      cy.getByDataTest("photo-list-item").should(
        "have.length",
        color.matchCount
      );

      cy.getByDataTest("photographer-link")
        .invoke("text")
        .should("match", color.photographersRegexp);
    });
  });
});
