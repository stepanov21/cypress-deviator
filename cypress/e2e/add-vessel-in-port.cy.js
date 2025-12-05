import { handleManualBasedFields } from "./support/manualUtils";

describe("I-Deviator Login Test", () => {
  it("should login with email and password", () => {
    // Visit the login page

    // Optional: Submit the form (uncomment if needed)
    // cy.get('button[type="submit"]').click()

    // Verify the fields are filled
    // cy.get('input[placeholder="Enter your email address"]').should(
    //   "have.value",
    //   "ihor.s@seaharmony.uk"
    // );
    // cy.get('input[placeholder="Enter your password"]').should(
    //   "have.value",
    //   "MR8BBwke4H"
    // );

    // cy.get("button").contains("Log In").should("be.visible");
    // cy.get("button").contains("Log In").click({});
    cy.visit("https://dev.ideviator.com/logbook");

    cy.contains("Compass Error Log Book").should("be.visible").click();

    cy.wait(4000);

    cy.get("body").then(($body) => {
      if ($body.find(".BackupPopup__closeButton").length > 0) {
        cy.get(".BackupPopup__closeButton").click();
      }
    });

    cy.contains("Add record").should("be.visible").click();

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 8); // Format as HH:MM:SS
    cy.get('input[name="record_time"]').focus().clear().type(currentTime);

    cy.get('.RadioButton_default:has(input[name="vessel_in_port"])').click();

    cy.get('input[name="lat"]').type("12345.6789");

    cy.get('.RadioButton_default:has(input[name="lat-N"])').click();

    cy.get('input[name="lng"]').type("12345.6789");

    cy.get('.RadioButton_default:has(input[name="lng-W"])').click();

    cy.get('select:has(option[value="berth-line"])').select(
      "By Berth Line direction"
    );

    cy.get('input[name="port_ships_head_gyro"]').focus().clear().type("120.8");

    cy.get('input[name="berth_line_true_direction"]')
      .focus()
      .clear()
      .type("123.8");

    cy.get('input[id="react-select-4-input"]').focus().clear().type("London");
    cy.contains("Londonderry").click();

    cy.get('input[id="react-select-3-input"]').focus().clear().type("Ber");
    cy.contains("Abercastle").click();

    cy.get('.RadioButton_default:has(input[name="port_gyro_type"])')
      .eq(2)
      .click();

    handleManualBasedFields("vessel-in-port");

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
    cy.get(`button[name="day"]`)
      .contains(new RegExp(`^${tomorrowDay.toString()}$`))
      .click();

    // Select day after tomorrow in the third calendar
    cy.get(".LogBookRecordRow__dateButton").eq(2).click();
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const dayAfterTomorrowDay = dayAfterTomorrow.getDate();
    cy.get(`button[name="day"]`)
      .contains(new RegExp(`^${dayAfterTomorrowDay.toString()}$`))
      .click();

    cy.get('select[name="observer"]').select("Chief Officer 2");

    // cy.get("button").contains("Save").should("be.visible");
    // cy.get("button").contains("Save").click();

    // cy.get(".LogBookTable__utcCell").first().should("contain", "12:00:00");

    // // Check latitude
    // cy.get(".LogBookTable__latCell").last().should("contain", "12°34.5' N");

    // // Check longitude
    // cy.get(".LogBookTable__lngCell").last().should("contain", "123°45.6' W");

    // // Check gyro head
    // cy.get(".LogBookTable__gyroHeadCell").last().should("contain", "120.8 °");

    // // Check true bearing
    // cy.get(".LogBookTable__trueBearingCell")
    //   .last()
    //   .should("contain", "123.8 °");

    // // Check observer (Chief Officer)
    // cy.get(".LogBookTable__observerCell").last().should("contain", "C/O");

    // // Check vessel status (in port)
    // cy.get(".LogBookTable__commentCell")
    //   .last()
    //   .should("contain", "Vessel in port");

    // // Check gyro type indicator
    // cy.get(".LogBookTable__gyroTypeIndicator").last().should("contain", "1");

    // // Verify the row exists and has the correct date
    // cy.get(".LogBookTable__dateCell").last().should("contain", "27 Nov 2025");
  });
});
