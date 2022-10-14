/// <reference types="Cypress" />

import usuario from '../../fixtures/usuario.json'

let token

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

    it("[GET] Deve selecionar o usuário logado", () => {
        cy.gerarToken(usuario[0].email, usuario[0].senha)
        .then((tkn) => {
            token = tkn
        })

        cy.request({
            method: 'GET',
            url: '/api/auth',
            cookie: token
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal(usuario[0].nome)
            expect(response.body.email).to.equal(usuario[0].email)
        })
        
    });
});