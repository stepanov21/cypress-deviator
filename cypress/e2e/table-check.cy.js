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

    cy.get("[data-tooltip-id='date-tooltip-2']").then(($elements) => {
      const currentTime = new Date();
      let bestMatch = null;
      let minDifference = Infinity;

      for (let i = 0; i < $elements.length; i++) {
        const timeText = $elements.eq(i).text().trim();
        const [hours, minutes, seconds] = timeText.split(":").map(Number);

        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
          const elementTime = new Date();
          elementTime.setHours(hours, minutes, seconds, 0);
          const difference = Math.abs(
            currentTime.getTime() - elementTime.getTime()
          );

          if (difference < minDifference) {
            minDifference = difference;
            bestMatch = i;
          }
        }
      }

      if (bestMatch !== null) {
        // Find the parent row of the matched element
        cy.wrap($elements.eq(bestMatch))
          .closest("tr")
          .then(($row) => {
            cy.log("Found matching row");

            // Now you can perform actions on the entire row
            // For example, check values in different cells:

            // Check time value
            cy.wrap($row)
              .find(".LogBookTable__utcCell")
              .should("contain", "12:00:00");

            // Check latitude
            cy.wrap($row)
              .find(".LogBookTable__latCell")
              .should("contain", "12°34.5' N");

            // Check longitude
            cy.wrap($row)
              .find(".LogBookTable__lngCell")
              .should("contain", "123°45.6' W");

            // Check gyro head
            cy.wrap($row)
              .find(".LogBookTable__gyroHeadCell")
              .should("contain", "120.8 °");

            // Check true bearing
            cy.wrap($row)
              .find(".LogBookTable__trueBearingCell")
              .should("contain", "123.8 °");

            // Check observer
            cy.wrap($row)
              .find(".LogBookTable__observerCell")
              .should("contain", "C/O");

            // Check vessel status
            cy.wrap($row)
              .find(".LogBookTable__commentCell")
              .should("contain", "Vessel in port");

            // Check gyro type
            cy.wrap($row)
              .find(".LogBookTable__gyroTypeIndicator")
              .should("contain", "1");

            // Or click on the entire row if needed
            // cy.wrap($row).click();
          });
      }
    });
  });
});
