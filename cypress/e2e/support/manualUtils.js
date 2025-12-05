export function handleManualBasedFields(recordType = "default") {
  cy.window().then((win) => {
    const logbookLicenseInfo = win.localStorage.getItem("logbookLicenseInfo");

    if (logbookLicenseInfo) {
      let licenseData;
      try {
        licenseData = JSON.parse(logbookLicenseInfo);
      } catch (error) {
        licenseData = { type: logbookLicenseInfo };
      }

      if (
        licenseData.type === "MC" ||
        licenseData.status === "MC" ||
        licenseData.status === "ME" ||
        licenseData.type === "ME"
      ) {
        cy.log("Running MC/ME  test case");
        // Заполняем поля для MC/ME лицензии
        if (recordType === "default") {
          cy.get('input[name="bearing_true"]').type("12345.6789");
          cy.get('input[name="magnetic_error_deg"]').type("12345.6789");

          cy.get('input[name="gyro_error_deg"]').type("12345.6789");
          cy.get('input[name="magnetic_error_deg"]').type("12345.6789");
          cy.get('input[name="variation_deg"]').type("12345.6789");
          cy.get('input[name="deviation_deg"]').type("12345.6789");
          cy.get('input[name="correlation_value"]').type("1.6789");

          cy.get(
            '.RadioButton_default:has(input[name="gyro_error_dir-W"])'
          ).click();
          cy.get(
              '.RadioButton_default:has(input[name="magnetic_error_dir-E"])'
            ).click();
            cy.get('.RadioButton_default:has(input[name="var-W"])')
            .first()
            .click();
            cy.get('.RadioButton_default:has(input[name="var-E"])').eq(1).click();
        } else if (recordType === "vessel-in-port") {
            cy.get('input[name="port_gyro_error_deg"]').type("12345.6789");
            cy.get(
              '.RadioButton_default:has(input[name="port_gyro_error_dir-E"])'
            ).click();

        }
      } else {
        cy.log(
          `License type: ${
            licenseData.type || licenseData.status
          } - skipping AE/ME specific fields`
        );
      }
    } else {
      cy.log("No license info found in localStorage");
    }
  });
}
