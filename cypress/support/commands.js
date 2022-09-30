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
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('generateFixture', () => {
  const faker = require('faker-br')

  cy.writeFile('cypress/fixtures/profileData.json', {
    'profileData': Cypress._.times(3, () => {
      return {
        'nome': `${faker.name.firstName()}`,
        'email': `${faker.internet.email()}`,
        'pass': `${faker.internet.password()}`,
        'company': `${faker.company.companyName()}`,
        'url': `${faker.internet.url()}`,
        'wrongUrl': `www.siteErrado.com.br`,
        'location': `${faker.address.city()}`,
        'skills': `${faker.random.words()}`,
        'bio': `${faker.name.jobDescriptor()}`
      }
    })
  })
})


Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login')
  cy.get('[data-test="login-email"]').type(email)
  cy.get('[data-test="login-password"]').type(senha)
  cy.get('[data-test="login-submit"]').click()

})

Cypress.Commands.add('alertMsg', () => {
  cy.get('[data-test="alert"]')
})

Cypress.Commands.add('cadastroUsuario', (nome, senha) => {
  cy.visit('/')
  cy.get('[data-test="landing-register"]').click()
  cy.get('[data-test="register-name"]').type(nome)
  cy.get('[data-test="register-email"]').type(nome + '@gmail.com')
  cy.get('[data-test="register-password"]').type(senha)
  cy.get('[data-test="register-password2"]').type(senha)
  cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('criarPerfil', (company, url, location, skills, bio) => {
  cy.get('[data-test="dashboard-createProfile"]').click()
  cy.get('#mui-component-select-status').click()
  cy.get('[data-value="QA Senior"]').click()
  cy.get('[data-test="profile-company"]').type(company)
  cy.get('[data-test="profile-webSite"]').type(url)
  cy.get('[data-test="profile-location"]').type(location)
  cy.get('[data-test="profile-skills"]').type(skills)
  cy.get('[data-test="profile-gitHub"]').type("www.github.com")
  cy.get('[data-test="profile-bio"]').type(bio)
  cy.get('[data-test="profile-submit"]').click()
})

Cypress.Commands.add('validarPagePerfil', () => {
  cy.get('[data-test="dashboard-editProfile"]')
})

Cypress.Commands.add('gerarToken', (email, senha) => {
  cy.request({
    method: 'POST',
    url: '/api/auth',
    body: {
      "email": email,
      "password": senha
    }
  }).then((response) => {
    return response.body.jwt
  })
})