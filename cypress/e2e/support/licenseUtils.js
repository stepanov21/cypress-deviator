export function handleLicenseBasedFields() {
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
        licenseData.type === "AE" ||
        licenseData.status === "AE" ||
        licenseData.status === "ME" ||
        licenseData.type === "ME"
      ) {
        cy.log("Running AE/ME license test case");
        // Заполняем поля для AE/ME лицензии
        cy.get('input[name="vessel_speed"]').type("9.8");
        cy.get('input[name="depth"]').type("46");
        cy.get('input[name="wind_direction"]').type("123");
        cy.get('input[name="wind_speed"]').type("12");
        cy.get('input[name="current_direction"]').type("123");
        cy.get('input[name="current_speed"]').type("12");
        cy.get('select[name="sea_state"]').select("3 Slight");
        cy.get('select[name="vessel_status"]').select("At Sea");
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
