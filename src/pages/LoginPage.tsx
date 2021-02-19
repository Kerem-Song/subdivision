import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../apollo";
import FormError from "../components/formError";
import { Button } from "../components/button";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";
import { LOCALSTORAGE_TOKEN } from "../constants";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  phoneNumber: string;
  password: string;
}

const LoginPage = () => {
  const history = useHistory();

  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token, error },
    } = data;

    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      history.push("/project");
      console.log("onCompletedToken: ", token);
    } else {
      console.log("onCompletedError: ", error);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { phoneNumber, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            phoneNumber,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <Helmet>
        <title>Login | 분양톡 관리자</title>
      </Helmet>
      <div className="max-w-screen-sm pt-20 p-10 items-center">
        <form className="flex" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-col">
            <div>
              <input
                className="inputBorer"
                ref={register({
                  required: "휴대폰번호 입력은 필수입니다.",
                })}
                name="phoneNumber"
                placeholder="휴대폰 번호 입력"
                required
              />
            </div>
            <div>
              <input
                className="inpuBordeer"
                ref={register({
                  required: "비밀번호 입력은 필수입니다.",
                  // pattern: /^[A-Za-z0-9._%+-!@#$^&*()]$/,
                })}
                name="password"
                type="password"
                placeholder="비밀번호 입력"
                required
              />
              {errors.password?.type === "minLength" && (
                <FormError errorMessage="비밀번호는 10자이상" />
              )}
              {errors.password?.message && (
                <FormError errorMessage={errors.password.message} />
              )}
            </div>
          </div>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"로그인"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
      <div>
        <span>아직 회원이 아니세요?</span>{" "}
        <Link to="/createUser" className="text-green-600 hover:underline">
          회원 가입하기
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
