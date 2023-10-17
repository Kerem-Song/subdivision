module.exports = {
  client: {
    includes: ["./src/**/*.{tsx, ts}"],
    tagName: "gql",
    service: {
      name: "Subdivision",
      url:
        "http://dev-parcelout-backend.ap-northeast-2.elasticbeanstalk.com/graphql",
    },
  },
};
