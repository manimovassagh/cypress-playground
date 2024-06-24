describe('Log JWT Token', () => {
   it('should log the JWT token', () => {
     const jwtToken = Cypress.env('JWT_TOKEN');
     cy.log(`JWT Token: ${jwtToken}`);
   });
 });
 