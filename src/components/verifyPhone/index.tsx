import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import FormError from "../formError";
import { Button } from "../button";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import {
  VerifyPhoneMutation,
  VerifyPhoneMutationVariables,
} from "../../__generated__/VerifyPhoneMutation";

export const VERIFYPHONE_MUTATION = gql`
  mutation VerifyPhoneMutation($verifyPhoneInput: VerifyPhoneInput!) {
    verifyPhone(input: $verifyPhoneInput) {
      ok
      error
      token
    }
  }
`;

interface IVerifyProps {
  userId: number;
}

interface IVerifyPhoneForm {
  userId: number;
  code: string;
}

export const VerifyPhone = ({ userId }: IVerifyProps) => {
  if (!userId) {
    return null;
  }

  const history = useHistory();

  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<IVerifyPhoneForm>({
    mode: "onChange",
  });

  const onCompleted = (data: VerifyPhoneMutation) => {
    const {
      verifyPhone: { ok, token, error },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      history.push("/project");
      console.log("onVerifyPhoneCompleted-token:", token);
    }
  };

  const [
    verifyPhoneMutation,
    { data: verifyPhoneMutationResult, loading },
  ] = useMutation<VerifyPhoneMutation, VerifyPhoneMutationVariables>(
    VERIFYPHONE_MUTATION,
    { onCompleted }
  );

  const onSubmit = () => {
    if (!loading) {
      const { userId, code } = getValues();

      verifyPhoneMutation({
        variables: {
          verifyPhoneInput: {
            userId: +userId,
            code,
          },
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="userId"
          type="hidden"
          className=""
          ref={register({
            required: true,
          })}
          placeholder="유저아이디"
          required
          value={userId}
        />
        <input
          name="code"
          type="password"
          className="inputBorder"
          ref={register({
            required: "인증번호 입력은 필수입니다.",
            // pattern: /^[A-Za-z0-9._%+-!@#$^&*()]$/,
            minLength: 6,
          })}
          placeholder="인증번호 입력"
          required
        />
        {errors.code?.type === "minLength" && (
          <FormError errorMessage="인증번호는 6자이상" />
        )}
        {errors.code?.message && (
          <FormError errorMessage="인증번호를 입력해 주세요" />
        )}
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText={"로그인하기"}
        />
      </form>
      {verifyPhoneMutationResult?.verifyPhone.error && (
        <FormError errorMessage={verifyPhoneMutationResult.verifyPhone.error} />
      )}
    </div>
  );
};
