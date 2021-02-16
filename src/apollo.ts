import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri:
    "http://dev-parcelout-backend.ap-northeast-2.elasticbeanstalk.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
