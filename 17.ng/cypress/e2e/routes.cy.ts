describe('Test App Routes', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('h1').contains('h1', 'Welcome');
    cy.get('h2').contains('h2', 'Home');
  });
  it('Visits the films page', () => {
    cy.visit('/films');
    cy.get('h1').contains('h1', 'Welcome');
    cy.get('h2').contains('h2', 'Films');
  });
  it('Visits the series page', () => {
    cy.visit('/series');
    cy.get('h1').contains('h1', 'Welcome');
    cy.get('h2').contains('h2', 'Series');
  });
  it('Visits the series page', () => {
    cy.visit('/about');
    cy.get('h1').contains('h1', 'Welcome');
    cy.get('h2').contains('h2', 'About');
  });
});
