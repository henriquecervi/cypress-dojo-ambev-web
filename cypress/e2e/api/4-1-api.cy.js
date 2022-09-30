/// <reference types="Cypress" />

describe('Teste de API', () => {
    const dojo = {
        aula: "API",
        duracao: 3,
        professor: "Renato"
    }

    it('Validar body dojo', () => {
        expect(dojo.aula).to.equal('API')
        expect(dojo.duracao).to.be.greaterThan(2)
        expect(dojo.professor).to.equal('Renato')
    });

    var numero = [0, 2, 4, 6, 8, 10]

    it('Validar numeros', () => {
        cy.log(`Posicao 1 do array ${numero[1]}`, )

        expect(numero).to.have.lengthOf(6);
        expect(numero[2]).to.eql(4)        
    });

    const alunos = [
        {usuario: "William", cargo: "QA"},
        {usuario: "Graciane", cargo: "QA"}
    ]

    it('Validar alunos', () => {
        expect(alunos[0].usuario).to.eql("William")
        expect(alunos[1].cargo).to.eql('QA')
        
    });
    
});