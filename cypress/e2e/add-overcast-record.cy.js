describe("I-Deviator Login Test", () => {
  it("should login with email and password", () => {
    // Visit the login page
    cy.visit("https://dev.ideviator.com/login");

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
    cy.get("button").contains("Log In").click({});

    cy.contains("Compass Error Log Book").should("be.visible").click();

    cy.wait(2000);

    cy.get("body").then(($body) => {
      if ($body.find(".BackupPopup__closeButton").length > 0) {
        cy.get(".BackupPopup__closeButton").click();
      }
    });

    cy.contains("Add record").should("be.visible").click();

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 8); // Format as HH:MM:SS
    cy.get('input[name="record_time"]').focus().clear().type(currentTime);

    cy.get('.RadioButton_default:has(input[name="overcast"])').click();

    cy.get('input[name="lat"]').type("12345.6789");

    cy.get('.RadioButton_default:has(input[name="lat-N"])').click();

    cy.get('input[name="lng"]').type("12345.6789");

    cy.get('input[name="ships_head_gyro"]').type("12345.6789");
    cy.get('input[name="ships_head_magnetic"]').type("12345.6789");
    cy.get('input[name="vessel_speed"]').type("9.8");
    cy.get('input[name="depth"]').type("46");
    cy.get('input[name="wind_direction"]').type("123");
    cy.get('input[name="wind_speed"]').type("12");
    cy.get('input[name="current_direction"]').type("123");
    cy.get('input[name="current_speed"]').type("12");



    cy.get('.RadioButton_default:has(input[name="lng-W"])').click();

    cy.get('select[name="sea_state"]').select("3 Slight");
    cy.get('select[name="vessel_status"]').select("At Sea");



    cy.get('input[id="react-select-3-input"]').focus().clear().type("Ber");
    cy.contains("Abercastle").click();

    cy.get(".LogBookRecordRow__dateButton").first().click();
    // Select tomorrow in the first calendar
    // Get tomorrow's date and click on it
    // Select today in the first calendar
    const today = new Date();
    const todayDay = today.getDate();
    cy.contains(todayDay.toString()).click();

    // Select tomorrow in the second calendar
    cy.get(".LogBookRecordRow__dateButton").eq(1).click();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDay = tomorrow.getDate();
    cy.get(`button[name="day"]`).contains(new RegExp(`^${tomorrowDay.toString()}$`)).click();


    cy.get('select[name="observer"]').select("Chief Officer 2");

    // cy.get("button").contains("Save").should("be.visible");
    // cy.get("button").contains("Save").click();
  });
});
