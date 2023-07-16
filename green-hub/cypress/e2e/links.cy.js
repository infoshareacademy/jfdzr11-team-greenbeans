// Testy  buttonów na głównej stronie
describe("Home page inks check", () => {
	it("Should visit each home page button link and go back to home page", () => {
		cy.visit(" http://localhost:5173/");

		cy.contains(/^Articles$/).click();
		cy.get("div").find("h1").first("h1").should("contain", "articles");
		cy.visit(" http://localhost:5173/");

		cy.contains(/^Get points!$/).click();
		cy.get("div").find("h1").first("h1").should("contain", "points");
		cy.visit(" http://localhost:5173/");

		cy.contains(/^New ideas$/).click();
		cy.get("div").find("h1").first("h1").should("contain", "ideas");
		cy.visit(" http://localhost:5173/");

		cy.contains(/^Prizes$/).click();
		cy.get("div").find("h1").first("h1").should("contain", "prize");
		cy.visit(" http://localhost:5173/");
	});
});

//Testy linków w Navbar
describe("Navbar links check", () => {
	it("Should visit each Navbar link and go back to home page", () => {
		cy.visit(" http://localhost:5173/");

		cy.contains(/^Articles$/).click();
		cy.get('[title="Points"] > img').click();
		cy.get("h1").should("contain", "points");

		cy.get('[title="Ideas"] > img').click();
		cy.get("h1").should("contain", "ideas");

		cy.get('[title="Articles"] > img').click();
		cy.get("h1").should("contain", "articles");

		cy.get('[title="Home"]').click();
		cy.url().should("eq", "http://localhost:5173/");
	});
});
