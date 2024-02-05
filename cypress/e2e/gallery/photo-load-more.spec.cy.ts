import { initial } from "lodash";

describe("Photo Load More button", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should display load more button", () => {
    cy.getByDataTest("load-more-button").should("exist");
  });

  it("should display a photos details", () => {
    let initialPhotoCount: number = 0;
    cy.getByDataTest("photo-list-item")
      .should("have.length.greaterThan", 0)
      .then((photos) => {
        initialPhotoCount = photos.length;

        cy.getByDataTest("load-more-button").click();

        cy.getByDataTest("photo-list-item")
          .should("have.length.greaterThan", 0)
          .then((photos) => {
            // Using another assertion method than "should"
            expect(photos.length).to.be.greaterThan(initialPhotoCount);
          });
      });
  });
});
