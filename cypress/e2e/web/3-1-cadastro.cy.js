/// <reference types="cypress" />

const faker = require('faker-br')
import usuario from '../../fixtures/usuario.json'

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.fixture('usuario').then((user) => {
            user = user
        })
        cy.visit('/')
    });

    afterEach('Screenshot depois testes',() => {
        cy.screenshot()
        
    });
    
    it('Cadastrar novo usuário com sucesso', () => {   
        
        let nome = `${faker.name.firstName()} ${faker.name.lastName()}`
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

    it('Cadastrar usuário com e-mail repetido', () => {
        cy.cadastroUsuario(usuario[0].nome, usuario[0].email, usuario[0].senha)   
        cy.alertMsg().should('have.text', 'Usuário já registrado')   
    });

});