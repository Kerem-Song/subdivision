/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchCustomerInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: CustomersQuery
// ====================================================

export interface CustomersQuery_customers_data {
  __typename: "Customer";
  phoneNumber: string;
  name: string;
}

export interface CustomersQuery_customers {
  __typename: "SearchCustomerOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  data: CustomersQuery_customers_data[] | null;
}

export interface CustomersQuery {
  customers: CustomersQuery_customers | null;
}

export interface CustomersQueryVariables {
  searchCustomerInput: SearchCustomerInput;
}
