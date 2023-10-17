describe("Create Account", () => {
  const user = cy;
  it("Should see phoneNumber / password validation errors", () => {
    user.visit("/");
    user.findByText(/회원 가입하기/).click();
    user.findByPlaceholderText(/휴대폰 번호 입력/).type("asdf");
    user.findByRole("alert").should("have.text", "숫자만 입력하세요");
    user.findByPlaceholderText(/휴대폰 번호 입력/).clear();
    user
      .findByRole("alert")
      .should("have.text", "휴대폰번호 입력은 필수입니다.");
    user.findByPlaceholderText(/휴대폰 번호 입력/).type("01012341234");
    user
      .findByPlaceholderText(/비밀번호 입력/)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "비밀번호 입력은 필수입니다.");
  });
  it("Should be able to create account and login", () => {
    user.intercept(
      "http://dev-parcelout-backend.ap-northeast-2.elasticbeanstalk.com/graphql",
      (req) => {
        const { operationName } = req.body;
        if (operationName && operationName === "CreateUserMutation")
          req.reply((res) => {
            res.send({
              //   data: {
              //     createUser: {
              //       ok: true,
              //       error: null,
              //       __typename: "CreateUserOutput",
              //     },
              //   },
              fixture: "auth/createUser.json",
            });
          });
      }
    );
    user.visit("/createUser");
    user.findByPlaceholderText(/휴대폰 번호 입력/).type("01012341234");
    user.findByPlaceholderText(/비밀번호 입력/).type("1234567890");
    user.findByRole("button").click();
    user.wait(1000);
    user.login("01012341234", "1234567890");
  });
});
