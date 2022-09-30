/// <reference types="Cypress" />



describe('Funcionalidade cadastro via API', () => {
    it('Deve efetuar cadastro com sucesso', () => {
        let email = `henrique${Math.floor(Math.random() * 1000)}@dojoambev.com.br`

        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": "Henrique",
                "email": email,
                "password": "123456"
              }
        }).then((response) => {
            expect(response.status).to.eql(201)
            expect(response.body).to.have.property('jwt')
            expect(response.body.jwt).to.not.be.null            
        })
    });
});