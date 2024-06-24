describe('Log JWT Token', () => {
   it('should log the JWT token', () => {
      const jwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
     const jwtToken = Cypress.env('CYPRESS_JWT');
     expect(jwtToken).to.equal(jwt);
     cy.log(`JWT Token: ${jwtToken}`);
   });
 });
 