import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import FormError from "../components/formError";
import { EnumType } from "typescript";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

// const CREATE_USER = gql`
//   mutation CreateUser($createUserInput: CreateUserDto!) {
//     createUser(input: $createUserInput) {
//       phoneNumber
//       password
//     }
//   }
// `;

// const Me = gql`
//   query Me {
//     id
//     phoneNumber
//     password
//     role
//   }
// `;

interface ILoginForm {
  phoneNumber: string;
  password: string;
  ok: boolean;
  token: string;
  error: string;
}

interface ICreateUserForm {
  phoneNumber: string;
  password: string;
  ok: boolean;
  error: string;
}

interface IMeProps {
  id: number;
  phoneNumber: string;
  password: string;
  role: EnumType;
}

const LoginPage = () => {
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

    if (ok) {
      isLoggedInVar(true);
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
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button onClick={onSubmit}>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
