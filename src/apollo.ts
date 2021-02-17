import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri:
    "http://dev-parcelout-backend.ap-northeast-2.elasticbeanstalk.com/graphql",
  // credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  console.log("headers:", headers);
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
      // "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
