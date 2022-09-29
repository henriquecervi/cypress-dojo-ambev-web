/// <reference types="cypress" />

import usuario from '../../fixtures/usuario.json'

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.fixture("usuario").then((user) => {
            user = user
        })
    });

    it('Efetuando Login com sucesso com custom commands', () => {
        cy.login(usuario[0].email, usuario[0].senha)  
        cy.get('[data-test="dashboard-welcome"]').should('have.text', ` Bem-vindo ${usuario[0].nome}`)
        cy.get('.large').should('contain', 'Dashboard').and('exist')         
    });

    it('Deve realizar login sem sucesso', () => {
        cy.login(usuario[0].email, usuario[0].senhaErrada)
        cy.alertMsg().should('have.text', 'Credenciais inválidas')        
    });
    
});