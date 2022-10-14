/// <reference types="Cypress" />

import mkperfis from '../../fixtures/perfis.json'

const options = {
    method: 'GET',
    url: 'api/profile'
}

const responseBody = {
    statusCode: 200,
    body: mkperfis
}

describe('Funcionalidade: Ver perfis', () => {
    beforeEach(() => {
        cy.visit('/perfis')
    });

    it('Deve validar o primeiro item da lista', () => {
        cy.fixture('perfis').then((mockperfis) => {
            cy.intercept('GET', 'api/profile', {
                statusCode: 200,
                body: mockperfis
            })
        })

    cy.reload()
    cy.get('[data-test="profile-name"]').first().should('have.text', 'Paulo Guerra')
});

    it('Deve validar o ultimo item da lista', () => {
        cy.intercept(options, responseBody).as('getPerfis')

        cy.reload()
        cy.get('[data-test="profile-name"]').last().should('have.text', mkperfis[3].user.name)
    });

    it('Deve validar o terceira item na lista exibido no front', () => {
        cy.intercept('**/api/profile**').as('loadProfile')
        cy.reload()
        cy.wait('@loadProfile')
        cy.get('[data-test="profile-name"]').eq(2).should('have.text', 'Pa Sun')
    });
        
    
});