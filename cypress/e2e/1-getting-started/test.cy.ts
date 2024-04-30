import { Dashboard } from "./object";

const dash = new Dashboard();

describe("first test to be ", () => {
  it("test it tttt", {}, () => {

    dash.visitUrl("https://www.youtube.com");
    cy.go("back");
  });

});
