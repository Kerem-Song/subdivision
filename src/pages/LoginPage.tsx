import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/formError";
import { Button } from "../components/button";
import { VerifyPhone } from "../components/verifyPhone";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      userId
    }
  }
`;

interface ILoginForm {
  phoneNumber: string;
  password: string;
  userId: number;
  code: string;
}

export const LoginPage = () => {
  const history = useHistory();
  const [id, setId] = useState(0);

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
      login: { ok, userId, error },
    } = data;
    if (ok && userId) {
      setId(userId);
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
                name="phoneNumber"
                className="inputBorder"
                ref={register({
                  required: "휴대폰번호 입력은 필수입니다.",
                  pattern: /[0-9]/,
                })}
                placeholder="휴대폰 번호 입력"
                required
              />
              {errors.phoneNumber?.type === "pattern" && (
                <FormError errorMessage="숫자만 입력하세요" />
              )}
              {errors.phoneNumber?.message && (
                <FormError errorMessage={errors.phoneNumber.message} />
              )}
            </div>
            <div>
              <input
                name="password"
                type="password"
                className="inputBorder"
                ref={register({
                  required: "비밀번호 입력은 필수입니다.",
                  // pattern: /^[A-Za-z0-9._%+-!@#$^&*()]$/,
                  // minLength: 10,
                })}
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
            actionText={"인증번호 입력하기"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        {!loginMutationResult ? <div></div> : <VerifyPhone userId={id} />}
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
