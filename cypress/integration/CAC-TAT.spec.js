/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit("./src/index.html")

    })
    it('verifica o título da aplicação', function(){

    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })
  

    it("preenche os campos obrigatórios e envia o formulário", function() {
    const longText= 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('Teste123@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('Teste123@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
})    
    it('campo telefone com string vazia', function(){
    cy.get('#phone')
    .type('ndianibahbfuovabgyub')
    .should('have.value', '')
})
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
cy.get('#firstName').type('Thiago')
cy.get('#lastName').type('Santana')
cy.get('#email').type('Teste123@gmail.com')
cy.get('#phone-checkbox').check()
cy.get('#open-text-area').type('teste')
cy.contains('button', 'Enviar').click()

cy.get('.error').should('be.visible')
})
it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
    .type('thiago')
    .should('have.value', 'thiago')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('santana')
    .should('have.value', 'santana')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('thiago@gmail.com')
    .should('have.value', 'thiago@gmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('1234567890')
    .should('have.value', '1234567890')
    .clear()
    .should('have.value', '')
})
it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
})
it('envia o formuário com sucesso usando um comando customizado', function(){
cy.fillMandatoryFieldsAndSubmit()
cy.get('.success').should('be.visible')

})
it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
})
it('seleciona um produto (mentoria) por seu Valor', function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})
it('seleciona um produto (Blog) por seu indice', function(){
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
})
it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')
})
it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]') 
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json') 
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })   
})
it('seleciona um arquivo da pasta fixtures usando drag and drop', function() {
    cy.get('input[type="file"]') 
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}) 
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })   
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
})   
it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
    
}) 
})

