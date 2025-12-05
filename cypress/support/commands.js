// ...existing code...

// ...existing code...

Cypress.Commands.add("login", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.log(`Attempting login for user: ${username}`);

      // Проверяем, есть ли уже активная сессия в куках
      cy.visit("https://dev.ideviator.com/login");

      cy.getCookie("srv").then((cookie) => {
        if (cookie && cookie.value) {
          cy.log("Session already exists in cookies, redirecting to dashboard");
          cy.visit("https://dev.ideviator.com/assistance"); // или другая страница после входа
          return;
        }

        // Если сессии нет, выполняем вход
        cy.contains("Login to I-Deviator").should("be.visible");

        // Find and fill the email field
        cy.get('input[placeholder="Enter your email address"]')
          .should("be.visible")
          .type(username);

        // Find and fill the password field
        cy.get('input[placeholder="Enter your password"]')
          .should("be.visible")
          .type(password);

        // Submit the form
        cy.get("button").contains("Log In").should("be.visible");
        cy.get("button").contains("Log In").click({});

        // Ждем редиректа после успешного входа
        cy.url().should("not.include", "/login");

        cy.log(`Successfully logged in as: ${username}`);
      });
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        // Проверяем валидность сессии через куки
        cy.getCookie("srv").then((cookie) => {
          if (!cookie || !cookie.value) {
            throw new Error("Session is not valid - srv cookie not found");
          }
        });
      },
    }
  );
});

// ...existing code...

Cypress.Commands.add("addWatermark", (text = "TD") => {
    cy.window().then((win) => {
        // Получаем информацию из localStorage
        const logbookLicenseInfo = win.localStorage.getItem("logbookLicenseInfo");
        
        // Удаляем существующий водный знак если есть
        const existingWatermark = win.document.getElementById("cypress-watermark");
        if (existingWatermark) {
            existingWatermark.remove();
        }

        // Создаем элемент водного знака
        const watermark = win.document.createElement("div");
        watermark.id = "cypress-watermark";
        watermark.textContent = logbookLicenseInfo ? logbookLicenseInfo : text;

        // Стили водного знака
        Object.assign(watermark.style, {
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "9999",
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "3px",
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            pointerEvents: "none",
            userSelect: "none",
        });

        win.document.body.appendChild(watermark);
    });
});
