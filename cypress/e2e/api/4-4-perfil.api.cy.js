/// <reference types="Cypress" />

import usuario from '../../fixtures/usuario.json'

let token
// let idExp
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


    it('[PUT] - Adicionando experiencia profissional ao perfil ', () => {
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

    // formatar com custom commands
    it.only('[DELETE] Deve deletar uma experiência profissional', () => {
        let idExp

        const bodyRequest2 = {
            title: 'QA2',
            company: "Ambev Tech2",
            from: "2021-10-22"
        }

        // cy.request({
        //     method: 'PUT',
        //     url: '/api/profile/experience',
        //     headers: {
        //         cookie: token
        //     },
        //     body: bodyRequest2
        // })
        cy.addExperience(token, bodyRequest2)
        .then((response) => {
            idExp = response
        })
        // .then((exp) => {
        //     idExp = exp
        // })
       
        cy.log(token)
        cy.log(idExp)           
        // ["Response Body"].experience
        // ["Response Body"].experience[0]
       // ["Response Body"].experience[0]._id

        // cy.request({
        //     method: 'DELETE',
        //     // url: `/api/profile/experience/${idExpProf}`,
        //     url: `/api/profile/experience/`,
        //     headers: {
        //         cookie: token,
        //         expId: idExpProf
        //     }
        // })


        
    });

});