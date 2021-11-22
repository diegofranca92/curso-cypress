describe('Tickets', () => {
  const baseURL = 'https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'
  const firstName = 'Diego'
  const lastName = 'França'
  const fullName = `${firstName} ${lastName}`

  beforeEach(() => {
    cy.visit(baseURL)
  });

  it('Preenche os campos do formulario', () => {
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('email@email.com');
    cy.get('#requests').type('Filmes');
    cy.get('#signature').type(`${firstName} ${lastName}`);
  });

  it('Seleciona 2 tickets', () => {
    cy.get('#ticket-quantity').select('2')
  });

  it('Seleciona ticket VIP', () => {
    cy.get('#vip').check()
  });
   
  it('Seleciona Social Media Checkbox', () => {
    cy.get('#social-media').check()
  });

  it('Seleciona Social Media Checkbox', () => {
    cy.get('#friend').check()
    cy.get('#publication').check()
    cy.get('#friend').uncheck()
  });
  
  it('Existe nome do site no cabeçalho', () => {
    cy.get('header h1').should('contain', 'TICKETBOX')
  });

  it('Alerta de email invalido', () => {
    cy.get('#email').as('email').type('email.email.com')

    cy.get('#email.invalid').should('exist')

    cy.get('@email').clear().type('email@email.com')

    cy.get('#email.invalid').should('not.exist')
  });

  it('Preenche todos os campos e reseta o formulario', () => {
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type('email@email.com');
    cy.get('#ticket-quantity').select('2')
    cy.get('#vip').check()
    cy.get('#social-media').check()
    cy.get('#requests').type('Filmes');
    
    cy.get('.agreement p').should('contain', 
    `I, ${fullName}, wish to buy 2 VIP tickets.`
    )
    
    cy.get('#agree').click()
    cy.get('#signature').type(fullName);

    cy.get('button[type=submit]').as('submitBtn').should('not.be.disabled')
    cy.get('button[type=reset]').click()
    cy.get('@submitBtn').should('be.disabled')
  });

  it.only('Preenche os campos Obrigatórios', () => {

    const user = {
      firstName: "Diego",
      lastName: 'França',
      email: 'email@email.com'
    }

    cy.fillRequireds(user);

    cy.get('button[type=submit]').as('submitBtn').should('not.be.disabled')
    cy.get('#agree').uncheck()
    cy.get('@submitBtn').should('be.disabled')
  });
});
