// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

before(() => {
  // Получаем роль пользователя из переменной окружения или используем 'manager' по умолчанию
  const userRole = Cypress.env('USER_ROLE') || 'manager';
  
  cy.fixture('users').then((users) => {
    const user = users[userRole];
    
    // Переопределяем данные из переменных окружения, если они переданы
    const email = Cypress.env('TEST_EMAIL') || user.username;
    const password = Cypress.env('TEST_PASSWORD') || user.password;
    
    cy.login(email, password);
  });
  

});

beforeEach(() => {
  // Инъекция CSS для водного знака
});