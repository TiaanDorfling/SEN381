/* global cy */ // <--- DO NOT REMOVE THIS!!!!!

describe("Blackbox Test: Student–Tutor Interaction", () => {
  it("should send and display a chat message", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=email]").type("student@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.url().should("include", "/dashboard");

    cy.contains("Messages").click();
    cy.get("input[name=message]").type("Hello Tutor!{enter}");

    cy.contains("Hello Tutor!").should("be.visible");
  });
});