class ExperienciaPage {
    get #expTitle () {return cy.get('[data-test="experience-title"]')}
    get #company () {return cy.get('[data-test="experience-company"]')}
    get #location () {return cy.get('[data-test="experience-location"]')}
    get #initialDate () {return cy.get('#from')}
    get #jobAtual () {return cy.get('.MuiTypography-root')}
    get #endDate () {return cy.get('#to')}
    get #expDescription () {return cy.get('[data-test="experience-description"]')}
    get #submit () {return cy.get('[data-test="experience-submit"]')}

    addExperiencia(expTitle, company, location, 
        initialDate, endDate, expDescription) {
        this.#expTitle.type(expTitle)
        this.#company.type(company)
        this.#location.type(location)
        this.#initialDate.type(initialDate)
        this.#endDate.type(endDate)
        this.#expDescription.type(expDescription)
        this.#submit.click()
    } 
    
    addExperienciaAtual(expTitle, company, location, 
        initialDate,  expDescription) {
        this.#expTitle.type(expTitle)
        this.#company.type(company)
        this.#location.type(location)
        this.#initialDate.type(initialDate)
        this.#jobAtual.click()
        this.#expDescription.type(expDescription)
        this.#submit.click()
        }

}

module.exports = new ExperienciaPage()