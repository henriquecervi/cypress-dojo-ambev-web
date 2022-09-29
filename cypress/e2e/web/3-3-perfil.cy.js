/// <reference types="cypress" />

let bodyData

describe('Funcionalidade: Criar Perfil', () => {

    beforeEach(() => {
        cy.generateFixture()
        cy.fixture('profileData.json').then((profileData) => {
            bodyData = profileData
        })
    });

    it('Deve criar um perfil com sucesso', () => {
        cy.cadastroUsuario(bodyData.profileData[0].nome, 
            bodyData.profileData[0].email,
            bodyData.profileData[0].pass)
        cy.criarPerfil(bodyData.profileData[0].company, 
            bodyData.profileData[0].url, 
            bodyData.profileData[0].location, 
            bodyData.profileData[0].skills, bodyData.profileData[0].bio) 
        cy.validarPagePerfil().should('have.text', ' Editar Perfil')  
    });

    it('Deve criar perfil com sucesso - Commands', () => {
        cy.cadastroUsuario(bodyData.profileData[1].nome, 
            bodyData.profileData[1].email,
            bodyData.profileData[1].pass)
        cy.criarPerfil(bodyData.profileData[1].company, 
            bodyData.profileData[1].url,
            bodyData.profileData[1].location, 
            bodyData.profileData[1].skills, bodyData.profileData[0].bio) 
        cy.validarPagePerfil().should('have.text', ' Editar Perfil')        
    });

    it('Deve criar perfil sem sucesso - Commands - site errado', () => {
        cy.cadastroUsuario(bodyData.profileData[2].nome, 
            bodyData.profileData[2].email,
            bodyData.profileData[2].pass)
        cy.criarPerfil(bodyData.profileData[2].company, 
            bodyData.profileData[2].wrongUrl,
            bodyData.profileData[2].location, 
            bodyData.profileData[2].skills, 
            bodyData.profileData[2].bio)  
        cy.get('.MuiFormHelperText-filled').should('have.text', 'Digite uma url válida')              
    });
});
