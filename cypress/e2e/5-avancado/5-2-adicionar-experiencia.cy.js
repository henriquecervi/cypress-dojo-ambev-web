/// <reference types="Cypress" />

const expPage = require('../../support/pages/add-experience.page')

const experiencia = {
    expTitle: 'QA',
    company: 'Ambev',
    location: 'São Paulo',
    initialDate: '01/10/2021',
    expDescription: 'Java, JS, Api'
}

describe('Funcionalidade: Adicionar Experiência', () => {

    beforeEach(() => {
        cy.fixture('usuario').then((data) => {
            cy.login(data[0].email, data[0].senha)
        })

        cy.visit('/adicionar-experiencia')
    })
    it('Deve adicionar experiencia com sucesso (page objects)', () => {
        
        expPage.addExperiencia
        ('QA', 
        'Ambev', 
        'São Paulo', 
        '01/10/2021',
        '01/10/2022', 
        'Java, JS')
        cy.get('[data-test="experience-delete"]').should('exist')        
    });

    it('Deve adicionar a experiencia atual com sucesso (page objects)', () => {
        expPage.addExperienciaAtual(
            experiencia.expTitle, 
            experiencia.company, 
            experiencia.location,
            experiencia.initialDate, 
            experiencia.expDescription)
        cy.get('[data-test="experience-delete"]').should('exist') 
    });
});