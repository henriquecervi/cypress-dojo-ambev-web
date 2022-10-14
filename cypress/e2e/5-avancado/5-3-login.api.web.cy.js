/// <reference types="Cypress" />

import user from '../../fixtures/usuario.json'
describe('Funcionalidade: Login via API e acesso ao perfil', () => {
    beforeEach(() => {
        cy.gerarToken(user[0].email, user[0].senha).then((tkn) => {
            Cypress.env('token', tkn)
        })
            
    })

    it('Validar uso com Cypress.env', () => {
        cy.log(Cypress.env('usuario'))
        cy.log(Cypress.env('token'))
    });

    it('Deve acessar o perfil com o login via API', () => {
        cy.clearCookies()
        cy.setCookie('jwt', Cypress.env('token'))
        cy.visit('/adicionar-experiencia')

        cy.get('.large').should('contain', ' Adicionar Experiência Profissional')
    });
});