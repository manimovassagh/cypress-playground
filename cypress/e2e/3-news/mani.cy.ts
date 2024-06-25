

 describe('Log JWT Token 22222', () => {
   it('should log the JWT token', () => {
      const jwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

     const cypressJwtToken = Cypress.env('CYPRESS_JWT');
     const jwtToken = Cypress.env('JWT_TOKEN');
     const jt2 = jwtToken
     expect(cypressJwtToken).to.be.a('string');
     expect(jwtToken).to.be.a('string')
     expect(jwtToken).to.equal(jt2);

     const data = {
      CYPRESS_JWT_TOKEN: cypressJwtToken,
      JWT_TOKEN: jwtToken
    };

    cy.writeFile('cypress/fixtures/env.json', data).then(() => {
      cy.log('Environment variables written to env.json');
    });
     cy.log(`CYPRESS_JWT_TOKEN: ${cypressJwtToken ? cypressJwtToken.substring(0, 4) + '****' : 'undefined'}`);
     cy.log(`JWT_TOKEN: ${jwtToken ? jwtToken.substring(0, 4) + '****' : 'undefined'}`);
   });
 });



 describe('first', () => { 
   it('test reader', () => {
      cy.readFile('cypress/fixtures/env.json').then((data) => {
         cy.log('Environment variables written to env.json',data);
       });
   });
  })
 