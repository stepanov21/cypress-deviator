describe("I-Deviator Login Test", () => {
  it("should login with email and password", () => {
    // Visit the login page
    cy.visit("https://dev.ideviator.com/login");

    // Wait for the page to load
    cy.contains("Login to I-Deviator").should("be.visible");

    // Find and fill the email field
    cy.get('input[placeholder="Enter your email address"]')
      .should("be.visible")
      .type("ihor.s@seaharmony.uk");

    // Find and fill the password field
    cy.get('input[placeholder="Enter your password"]')
      .should("be.visible")
      .type("MR8BBwke4H");

    // Optional: Submit the form (uncomment if needed)
    // cy.get('button[type="submit"]').click()

    // Verify the fields are filled
    cy.get('input[placeholder="Enter your email address"]').should(
      "have.value",
      "ihor.s@seaharmony.uk"
    );
    cy.get('input[placeholder="Enter your password"]').should(
      "have.value",
      "MR8BBwke4H"
    );

    cy.get("button").contains("Log In").should("be.visible");
    cy.get("button").contains("Log In").click();

    cy.contains("Magnetic Compass Adjustment").should("be.visible").click();
    cy.contains("Start new adjustment procedure").should("be.visible").click();

    cy.get(".DeviationRequestPage__content").scrollTo("bottom");

    cy.get("button").contains("No").click();

    cy.wait(500);

    cy.get(".DeviationRequestPage__content").scrollTo("bottom");

    cy.get("button").contains("Confirm").click();

    cy.wait(500);
    cy.get(".DeviationRequestPage__content").scrollTo("bottom");

    cy.get("button").contains("Confirm").click();

    cy.get('input[placeholder="Vessel Name"]')
      .should("be.visible")
      .type("Test Vessel Name");

    cy.get(".Button_send").click();

    cy.get('input[placeholder="Vessel Call Sign"]')
      .should("be.visible")
      .type("TEST123");

    cy.get(".Button_send").click();

    cy.get('input[placeholder="Vessel flag"]').should("be.visible").type("Test Flag");

    cy.get(".Button_send").click();
  });
});
