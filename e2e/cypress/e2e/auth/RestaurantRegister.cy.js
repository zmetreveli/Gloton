describe("Restaurante Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  it("create restaurante profile", () => {
    cy.contains("Gloton para socios").click();
    cy.get('input[placeholder="Ciudad"]').type("Barcelona");
    cy.get('input[placeholder="Nombre del negocio"]').type("test Cypress");
    cy.get('input[placeholder="Nombre"]').type("Cypress");
    cy.get('input[placeholder="Apellidos"]').type("Test");
    cy.get('input[placeholder="Email"]').type("testrestaurante@cypress.com");
    cy.get('input[placeholder="Contraseña"]').type("Cypress123");
    cy.get('input[placeholder="Teléfono"]').type("123456789");
    cy.get("#privacy").check();
  });
});
