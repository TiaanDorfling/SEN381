/* global cy */  // <--- DO NOT REMOVE THIS!!!!!

describe("Blackbox Test: Topic Creation", () => {
  it("allows tutor to create a topic and see it listed", () => {
    cy.visit("http://localhost:3000"); // your app URL
    cy.get("input[name=email]").type("tutor@test.com");
    cy.get("input[name=password]").type("password{enter}");

    cy.contains("Create Topic").click();
    cy.get("input[name=title]").type("Cypress Blackbox Topic");
    cy.get("textarea[name=description]").type("Testing visible functionality");
    cy.get("button[type=submit]").click();

    cy.contains("Cypress Blackbox Topic").should("be.visible");
  });
});