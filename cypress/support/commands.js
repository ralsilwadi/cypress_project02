// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add("clickCard", (link) => {
  cy.get(".cards").contains(link).click();
});


Cypress.Commands.add('selectDropdownOption', (element, option) => {
  cy.get(element).select(option)
})



Cypress.Commands.add("checkOptionAndValidateOthersNotChecked",(optionToCheck, expectedTexts) => {

  cy.contains(optionToCheck).find('input').check().should('be.checked')

  expectedTexts.filter(option => option !== optionToCheck).forEach(uncheckOption => {
    cy.contains(uncheckOption).find('input').should('not.be.checked')
  })
})

// Cypress.Commands.add("login", (user, pass) => {
//   cy.get('#username').type(user);
//   cy.get('#password').type(pass);
//   cy.get("#login_btn").click();
// });


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
Cypress.Commands.add('assertAttribute', { prevSubject: 'element'}, (subject, attribute, value) => { 
  cy.wrap(subject).should('have.attr', attribute, value)
})
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })