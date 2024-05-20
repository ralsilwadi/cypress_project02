/// <reference types="cypress" />

describe("Login Automation Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/");
    cy.clickCard("Login Function");
  });

  const validLogin = ["TechGlobal", "Test1234"];
  const eightToTen = [ // 3 objects within an array to use .forEach function on test cases 8-10
    {
      description: "Validate the invalid login with the wrong username",
      user: "John",
      pass: "Test1234",
      result: "Invalid Username entered!",
    },
    {
      description: "Validate the invalid login with the wrong password",
      user: "TechGlobal",
      pass: "1234",
      result: "Invalid Password entered!",
    },
    {
      description: "Validate the invalid login with the wrong username and password",
      user: "John",
      pass: "1234",
      result: "Invalid Username entered!",
    },
  ];

  const login = (user, pass) => {
    cy.get('#username').clear().type(user);
    cy.get('#password').clear().type(pass);
    cy.get('#login_btn').click();
  };

  it("Test Case 01 - Validate the login form", () => {
    cy.get("#username")
      .should("be.visible")
      .prev()
      .should("have.text", "Please enter your username")
      .next()
      .should("not.have.attr", "required");

    cy.get("#password")
      .should("be.visible")
      .prev()
      .should("have.text", "Please enter your password")
      .next()
      .should("not.have.attr", "required");

    cy.get("#login_btn")
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "LOGIN")
      .next()
      .should("be.visible")
      .and("have.attr", "href");
  });

  it("Test Case 02 - Validate the valid login", () => {
    login("TechGlobal", "Test1234");
    cy.get("#success_lgn").should("have.text", "You are logged in");
    cy.get("#logout").should("have.text", "LOGOUT");
  });

  it("Test Case 03 - Validate the logout", () => {
    login("TechGlobal", "Test1234");
    cy.get("#logout").click();
    cy.get("#login_btn").should("exist");
  });

  it("Test Case 04 + 05 - Validate the Forgot Password? Link and Reset Password modal and close button", () => {
    cy.get("#login_btn").next().click();
    cy.get("#modal_title, .delete, #email, #submit").each(($el) => {
      cy.wrap($el).should("be.visible");
    });
    cy.get('[for="email"]').should(
      "have.text",
      `Enter your email address and we'll send you a link to reset your password. `
    );
    cy.get("#submit").should("be.visible").and("have.text", "SUBMIT");
    cy.get('.delete').click()
    cy.get('.modal-card').should('not.exist'); 
  });

  it("Test Case 06 - Validate the Reset Password form submission", () => {
    cy.get('#login_btn').next().click();
    cy.get('#email').type('info@techglobalschool.com');
    cy.get('#submit').click();
    cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.');
  });

  it("Test Case 07 - Validate the invalid login with empty credentials", () => {
    cy.get('#login_btn').click();
    cy.get('#error_message').should('have.text', 'Invalid Username entered!');
  });

 eightToTen.forEach((test, index) => {
    it(`Test Case ${index === 2 ? '' : 0}${index + 8} - ${test.description}`, () => {

      login(test.user, test.pass);
      cy.get('#error_message').should('have.text', `${test.result}`);
    });
  });


});

