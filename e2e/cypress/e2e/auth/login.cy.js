describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  it("Login", () => {
    cy.contains("Empieza aquí").click();
    cy.contains("Accede").click();
    cy.get('input[placeholder="Email"]').first().type("test2@cypress.com");
    cy.get('input[placeholder="Contraseña"]').type("Cypress123");
    cy.contains("Iniciar Sesión").click();
    cy.get('input[placeholder="Cuál es tu dirección?"]').type("nuclio");
    cy.get("ul > li").first().click();
    cy.get("#grid")
      .should("exist")
      .and("be.visible")
      .then(() => {
        cy.get("#grid")
          .children()
          .first()
          .should("exist")
          .and("be.visible")
          .click();
      });
    cy.contains("+").click();
    cy.contains("Comprar por").click();
    cy.contains("Agregar dirección").click();
    cy.get('input[placeholder="Dirección"]').type("nuclio");
    cy.get("ul > li").first().click();
    cy.get('input[placeholder="Número"]').type("123");
    // cy.get('input[placeholder="Piso"]').type("1");
    cy.contains("Agregar dirección").click();
    // cy.contains("X").click();
    cy.contains("Agregar tarjeta").click();
    cy.get('input[placeholder="Nombre"]').type("cypress test");
    cy.get('input[placeholder="Número de la tarjeta"]').type(
      "4567763653563876"
    );
    cy.get('input[placeholder="Validez (MM/AA)"]').type("1230");
    cy.get('input[placeholder="CVC"]').type("123");
    cy.contains("Agregar tarjeta").click({ force: true });
    cy.contains("Confirmar pedido por").click();
  });
});
