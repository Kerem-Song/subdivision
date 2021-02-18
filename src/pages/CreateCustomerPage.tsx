import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/formError";
import { Button } from "../components/button";
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
} from "../__generated__/CreateCustomerMutation";

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomerMutation($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      ok
      error
    }
  }
`;

interface ICreateCustomerForm {
  phoneNumber: string;
  name: string;
}

const CreateCustomerPage = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateCustomerForm>({ mode: "onChange" });

  const onCompleted = (data: CreateCustomerMutation) => {
    const {
      createCustomer: { ok },
    } = data;

    if (ok) {
      history.push("/alarmtalk");
    }
  };

  const [
    createCustomerMutation,
    { data: createCustomerMutationResult, loading },
  ] = useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(
    CREATE_CUSTOMER_MUTATION,
    { onCompleted }
  );

  const onSubmit = () => {
    if (!loading) {
      const { phoneNumber, name } = getValues();
      createCustomerMutation({
        variables: {
          createCustomerInput: {
            phoneNumber,
            name,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <Helmet>
        <title>분양톡 멤버 추가</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-coll px-20 items-center">
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
              })}
              name="name"
              type="name"
              placeholder="이름 입력"
              required
            />
            {errors.name?.type === "minLength" && (
              <FormError errorMessage="이름 형식이 맞지 않습니다." />
            )}
            {errors.name?.message && (
              <FormError errorMessage={errors.name.message} />
            )}
          </div>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"분양톡 회원 추가"}
          />
          {createCustomerMutationResult?.createCustomer.error && (
            <FormError
              errorMessage={createCustomerMutationResult.createCustomer.error}
            />
          )}
        </form>
      </div>
      <div>
        <Link to="/alarmtalk" className="text-green-600 hover:underline">
          알람톡으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default CreateCustomerPage;
