describe("User authorization", () => {
	it("Should diplay error toast after submitting wrong credentials ", () => {
		cy.visit(" http://localhost:5173/login");

		cy.get("#email").type("michal@test.gmail.com");
		cy.get("#password").type("1234");
		cy.get("form").submit();
		cy.contains("Invalid login").should("be.visible");
	});
	it("Should login, redirect to home page and display success toast", () => {
		cy.visit("http://localhost:5173/login");

		cy.get("#email").type("admin@gmail.com");
		cy.get("#password").type("admin@gmail.com");
		cy.get("form").submit();
		cy.contains("Logged in succesfully").should("be.visible");
		cy.url().should("eq", "http://localhost:5173/");
		cy.contains(/^Logout$/).click();
	});
});
