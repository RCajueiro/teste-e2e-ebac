Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('dados', (endereço, cidade, estado, cep, telefone) => {
    cy.get('#billing_address_1').type(endereço)
    cy.get('#billing_city').type(cidade)
    cy.get('#select2-billing_state-container').click()
    cy.get('.select2-search__field').click().type(estado).type('{enter}')
    cy.get('#billing_postcode').type(cep)
    cy.get('#billing_phone').type(telefone)
})