/// <reference types="Cypress" />

import usuario from '../../fixtures/usuario.json'

describe('Funcionalide login via API', () => {

    beforeEach(() => {
        cy.fixture('usuario').then((user) => {
            user = user
        })
    });

    it('Deve efetuar login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": usuario[0].email,
                "password": usuario[0].senha
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.jwt).to.not.be.empty
        })
        
    });
});