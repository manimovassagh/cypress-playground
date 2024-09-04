interface WebLocaters {
  [key: string]: string;
}

export class Dashboard {
 


   locaters: WebLocaters = {
    check: "data-cy=test",
    second:"new-cy",
    third:"third-cy"
  };

  visitDashboard(): void {
    cy.visit("/dashboard");
  }

  visitUrl(url: string) {
    cy.visit(url);
    this.locaters.check;
  }
}
