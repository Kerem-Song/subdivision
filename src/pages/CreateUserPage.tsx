import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/formError";
import { Button } from "../components/button";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "../__generated__/CreateUserMutation";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($createUserInput: CreateUserDto!) {
    createUser(input: $createUserInput) {
      ok
      error
    }
  }
`;

interface ICreateUserForm {
  phoneNumber: string;
  password: string;
}

export const CreateUserPage = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateUserForm>({
    mode: "onChange",
  });

  const onCompleted = (data: CreateUserMutation) => {
    const {
      createUser: { ok },
    } = data;

    if (ok) {
      alert("계정이 생성되었습니다. 로그인 하세요.");
      history.push("/");
    }
  };

  const [
    createUserMutation,
    { data: createUserMutationResult, loading },
  ] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CREATE_USER_MUTATION,
    { onCompleted }
  );

  const history = useHistory();

  const onSubmit = () => {
    if (!loading) {
      const { phoneNumber, password } = getValues();
      createUserMutation({
        variables: {
          createUserInput: {
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
        <title>회원가입 | 분양톡 관리자</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-coll px-20 items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="inputBorer"
              ref={register({
                required: "휴대폰번호 입력은 필수입니다.",
                pattern: /[0-9]/,
              })}
              name="phoneNumber"
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
              className="inpuBordeer"
              ref={register({
                required: "비밀번호 입력은 필수입니다.",
                // pattern: /^[A-Za-z0-9._%+-!@#$^&*()]$/
                minLength: 10,
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
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"회원가입"}
          />
          {createUserMutationResult?.createUser.error && (
            <FormError
              errorMessage={createUserMutationResult.createUser.error}
            />
          )}
        </form>
      </div>
      <div>
        <span>회원이세요?</span>{" "}
        <Link to="/" className="text-green-600 hover:underline">
          로그인 하기
        </Link>
      </div>
    </div>
  );
};
