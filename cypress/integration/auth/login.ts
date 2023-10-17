describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | 분양톡 관리자");
  });
  it("can see phoneNumber /password validation errors", () => {
    // cy.visit("/")
    //   .get(":nth-child(1) > .inputBorder")
    //   .type("asdf")
    //   .get(":nth-child(1) > .formError")
    //   .should("have.text", "숫자만 입력하세요");
    cy.visit("/");
    cy.findByPlaceholderText("휴대폰 번호 입력").type("ㅁㄴㅇㄹ");
    cy.findByRole("alert").should("have.text", "숫자만 입력하세요");
    cy.findByPlaceholderText("휴대폰 번호 입력").clear();
    cy.findByRole("alert").should("have.text", "휴대폰번호 입력은 필수입니다.");
    cy.findByPlaceholderText("휴대폰 번호 입력").type("01012345678");
    cy.findByPlaceholderText("비밀번호 입력").type("a").clear();
    cy.findByRole("alert").should("have.text", "비밀번호 입력은 필수입니다.");
  });
  it("can fill out the form and login", () => {
    // cy.visit("/");
    // cy.findByPlaceholderText("휴대폰 번호 입력").type("01012341234");
    // cy.findByPlaceholderText("비밀번호 입력").type("1234567890");
    // cy.findByRole("button")
    //   .should("not.have.class", "pointer-events-none")
    //   .click();
    // cy.window().its("localStorage.subdivision-token").should("be.a", "string");
    cy.login("01012341234", "1234567890");
  });
  it("sign up", () => {
    cy.visit("/createUser");
  });
});
