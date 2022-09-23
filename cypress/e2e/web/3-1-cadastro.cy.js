/// <reference types="cypress" />

const faker = require('faker-br')

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('/')
    });
    
    it('Cadastrar novo usuário com sucesso', () => {   
        
        let nome = `${faker.name.firstName()} ${faker.name.lastName()}`
        //let email = faker.internet.email(nome)
        let password = faker.internet.password()
        
        cy.get('[data-test="landing-register"]').click()
        cy.get('[data-test="register-name"]').type(nome)
        cy.get('[data-test="register-email"]').type(nome + '@gmail.com')
        cy.get('[data-test="register-password"]').type(password)
        cy.get('[data-test="register-password2"]').type(password)
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="dashboard-welcome"]').should('have.text', ` Bem-vindo ${nome}`)
        cy.get('.large').should('contain', 'Dashboard').and('exist')        
        
    });   

});