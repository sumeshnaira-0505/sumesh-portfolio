describe('Portfolio', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the hero section', () => {
    cy.contains("Hi, I'm").should('be.visible')
  })

  it('has navigation links', () => {
    cy.get('nav').should('exist')
    cy.contains('About').should('be.visible')
    cy.contains('Projects').should('be.visible')
    cy.contains('Skills').should('be.visible')
    cy.contains('Contact').should('be.visible')
  })

  it('scrolls to projects section', () => {
    cy.contains('View Work').click()
    cy.get('#projects').should('exist')
  })
})
