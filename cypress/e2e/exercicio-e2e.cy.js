/// <reference types="cypress" />
const checkout = require('../fixtures/checkout.json')

import produtosPage from "../support/page_objects/produtos.page";

import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  afterEach(() => {
    cy.screenshot()
  });
 
  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
   
    //Fazendo o cadastro:
    cy.get('.icon-user-unfollow').click()

    var nome = faker.person.firstName()
    var email = faker.internet.email(nome)
    var sobrenome = faker.person.lastName()

    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type('teste123')
    cy.get(':nth-child(4) > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá,')
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').type(nome)
    cy.get('#account_last_name').type(sobrenome)
    cy.get('#account_display_name').clear().type(nome)        
    cy.get('.woocommerce-Button').click()
    cy.get('.woocommerce-message').should('exist')

    //Adicionando produtos ao carrinho
    cy.get('#primary-menu > .menu-item-629 > a').click()
    let qtd = 1

    produtosPage.buscarProdutoLista('Ariel Roll Sleeve Sweatshirt')
    produtosPage.addProdutoCarrinho('XS', 'Purple', qtd)
    cy.get('.woocommerce-message').should('contain' , 'adicionado')
    
    produtosPage.buscarProduto('Strike Endurance Tee')
    produtosPage.addProdutoCarrinho('XL' , 'Red' , qtd)
    cy.get('.woocommerce-message').should('contain' , 'adicionado')

    produtosPage.buscarProduto('Ingrid Running Jacket')
    produtosPage.addProdutoCarrinho('XS', 'Orange', qtd)
    cy.get('.woocommerce-message').should('contain' , 'adicionado')

    produtosPage.buscarProduto('Autumn Pullie')
    produtosPage.addProdutoCarrinho('M', 'Green', qtd)
    cy.get('.woocommerce-message').should('contain' , 'adicionado')

    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()

    //Preenchendo os Dados para o checkout e finalizando a compra
    cy.dados(checkout.endereço, checkout.cidade, checkout.estado, checkout.cep, checkout.telefone)
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.wait(5000) // A página as vezes demora de carregar, então adicionei essa espera pra não falhar a verificação
    cy.get('.woocommerce-notice').should('contain' , 'Seu pedido foi recebido')
      
  });

})