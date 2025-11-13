describe("User Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  it("create user profile", () => {
    cy.contains("Empieza aquí").click();
    cy.get('input[placeholder="Nombre"]').type("cypress test");
    cy.get('input[placeholder="Email"]').type("test2@cypress.com");
    cy.get('input[placeholder="Contraseña"]').type("Cypress123");
    cy.contains("Registrar").click();
    cy.get("img._userIcon_1lcio_111").should("be.visible").click();
    cy.get("img._pencilIcon_o0lq7_240").first().click();
    cy.contains("Cerrar sesión").click();
  });
});
