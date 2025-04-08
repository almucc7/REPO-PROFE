import { should } from 'chai';

describe('Test About page', () => {
  beforeEach(() => {
    cy.visit('/about');
    cy.contains('h2', 'About');
  });

  it('Should increase the first counter', () => {
    //const output =
    cy.contains('output', '0');
    cy.contains('button', '➕').click();
    // output.should('have.text', '1');
    cy.contains('output', '1');
    cy.contains('button', '➖').click().click();
    cy.contains('output', '-1').should('have.class', 'negative');
  });
  it('Should write in the input', () => {
    cy.get('input').type('Pepe');

    cy.get('input').should('have.value', 'Pepe');
    cy.contains('p', 'Hola').and('include.text', 'Pepe');
    cy.contains('button', 'Borrar').click();
    cy.contains('p', 'Hola').and('include.text', 'amigo');
  });
});
