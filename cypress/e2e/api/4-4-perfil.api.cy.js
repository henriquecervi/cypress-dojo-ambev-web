/// <reference types="Cypress" />

import usuario from '../../fixtures/usuario.json'

let token
describe('Funcionalidade perfil via API', () => {
    beforeEach(() => {
        cy.gerarToken(usuario[0].email, usuario[0].senha)
        .then((tkn) => {
            token = tkn

        })
    });

    it('[GET] - Deve consultar perfil do usuario', () => {
        const parameter = {
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                cookie: token
            }
        }
        cy.request(parameter).then((response) =>{
            expect(response.status).to.eql(200)
            expect(response.body.githubusername).to.eql('https://github.com/henriquecervi')
            expect(response.body.skills[1]).to.equal('Java')
        })
    });


    it.only('[PUT] - Adicionando experiencia profissional ao perfil ', () => {
        const bodyRequest = {
            title: 'QA',
            company: "Ambev Tech",
            from: "2021-10-22"
        }
        const options = {
            method: 'PUT',
            url: '/api/profile/experience',
            headers: {
                cookie: token
            },
            body: 
                bodyRequest                 
        }
        cy.request(options).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.experience[0].title).to.equal(bodyRequest.title)
            expect(response.body.experience[0].company).to.equal(bodyRequest.company)
        })
        
    });

});