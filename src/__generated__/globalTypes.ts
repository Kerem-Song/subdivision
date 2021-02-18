/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Admin = "Admin",
  Operator = "Operator",
}

export interface CreateCustomerInput {
  phoneNumber: string;
  name: string;
}

export interface CreateUserDto {
  phoneNumber: string;
  password: string;
}

export interface LoginInput {
  phoneNumber: string;
  password: string;
}

export interface SearchCustomerInput {
  phoneNumber?: string | null;
  name?: string | null;
  pageNo: number;
  pageSize: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
