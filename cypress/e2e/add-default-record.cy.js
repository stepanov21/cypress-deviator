import { handleLicenseBasedFields } from "./support/licenseUtils";
import { handleManualBasedFields } from "./support/manualUtils";

describe("I-Deviator Login Test", () => {
  it("should login with email and password", () => {
    // Visit the login page
    cy.visit("https://dev.ideviator.com/logbook");

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

    cy.get('.RadioButton_default:has(input[name="normal"])').click();

    cy.get('input[name="lat"]').type("12345.6789");

    cy.get('.RadioButton_default:has(input[name="lat-N"])').click();

    cy.get('input[name="lng"]').type("12345.6789");
    cy.get('input[name="pitch_roll"]').type("12");
    cy.get('input[name="ships_head_gyro"]').type("12345.6789");
    cy.get('input[name="ships_head_magnetic"]').type("12345.6789");
    cy.get('input[name="bearing_gyro"]').type("287");
    cy.get('input[name="magnetic_bearing"]').type("287");

    handleLicenseBasedFields();
    handleManualBasedFields('default');

    cy.get('.RadioButton_default:has(input[name="gyro_type"])').eq(2).click();

    cy.get('.RadioButton_default:has(input[name="lng-W"])').click();
    cy.get('select[name="repeater"]').select("Starboard");

    cy.get('input[id="react-select-2-input"]').focus().clear().type("Moon");
    cy.get('div[id="react-select-2-option-3"]').click();

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
    cy.get(`button[name="day"]`)
      .contains(new RegExp(`^${tomorrowDay.toString()}$`))
      .click();

    cy.get('select[name="observer"]').select("Chief Officer 2");

    // cy.get("button").contains("Save").should("be.visible");
    // cy.get("button").contains("Save").click();
  });
});
