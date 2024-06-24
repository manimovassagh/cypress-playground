describe('Log JWT Token', () => {
   it('should log the JWT token', () => {
      const jwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
     const jwtToken = Cypress.env('CYPRESS_JWT');
     expect(jwtToken).to.equal(jwt);
     cy.log(`JWT Token: ${jwtToken}`);
   });
 });
 

 describe('Log JWT Token 22222', () => {
   it('should log the JWT token', () => {
     const cypressJwtToken = Cypress.env('CYPRESS_JWT_TOKEN');
     const jwtToken = Cypress.env('JWT_TOKEN');
     cy.log(`CYPRESS_JWT_TOKEN: ${cypressJwtToken ? cypressJwtToken.substring(0, 4) + '****' : 'undefined'}`);
     cy.log(`JWT_TOKEN: ${jwtToken ? jwtToken.substring(0, 4) + '****' : 'undefined'}`);
   });
 });
 