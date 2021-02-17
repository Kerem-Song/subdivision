/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserMutation
// ====================================================

export interface CreateUserMutation_createUser {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateUserMutation {
  createUser: CreateUserMutation_createUser;
}

export interface CreateUserMutationVariables {
  createUserInput: CreateUserDto;
}
