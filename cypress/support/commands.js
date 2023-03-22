Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('Teste123@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    
})