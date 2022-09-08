/* eslint-disable no-undef */
describe("test sur notre api", () => {
    it("1er test sur la route all brand", () => {
        cy.server();
        cy.route("GET", "https://the-good-choice-market-v1.herokuapp.com/api/brand", "fix:allBrand.json").as("fetchAllBrand");


        cy.visit("https://the-good-choice-market-v1.herokuapp.com/");
        cy.get("li > a").click();
        cy.get("select").select("https://the-good-choice-market-v1.herokuapp.com/ - Server de Heroku");
        cy.get("#operations-Brand-get_api_brand").click();
        cy.get(".try-out__btn").click();
        cy.get(".execute-wrapper > .btn").click();
        cy.wait("@fetchAllBrand");
        cy.get("@allBrand").contains("Les gourmands verts");
    });
});
