/// <reference types="cypress" />

import usuario from '../../fixtures/usuario.json'

describe('Funcionalidade: Criar Perfil', () => {

    beforeEach(() => {
        cy.fixture('usuario').then((user) => {
            user = user            
            cy.login(usuario[0].email, usuario[0].senha)
        })
    });

    // melhorar dados no type e criar custom command
    it('Deve criar um perfil com sucesso', () => {
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('#mui-component-select-status').click()
        cy.get('[data-value="QA Senior"]').click()
        cy.get('[data-test="profile-company"]').type("Ambev Tech")
        cy.get('[data-test="profile-webSite"]').type("https://www.linkedin.com/in/henriquecervi/")
        cy.get('[data-test="profile-location"]').type("São Paulo")
        cy.get('[data-test="profile-skills"]').type('JS, Java, Automação')
        cy.get('[data-test="profile-gitHub"]').type('https://github.com/henriquecervi')
        cy.get('[data-test="profile-bio"]').type('QA apaixonado pela profissão')
        cy.get('[data-test="profile-submit"]').click()        
    });
});