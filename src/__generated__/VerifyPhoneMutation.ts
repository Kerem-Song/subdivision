/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyPhoneInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyPhoneMutation
// ====================================================

export interface VerifyPhoneMutation_verifyPhone {
  __typename: "VerifyPhoneOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface VerifyPhoneMutation {
  verifyPhone: VerifyPhoneMutation_verifyPhone;
}

export interface VerifyPhoneMutationVariables {
  verifyPhoneInput: VerifyPhoneInput;
}
