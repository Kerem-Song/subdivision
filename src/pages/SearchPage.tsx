// import Reactt, { useEffect } from "react";
// import { gql, useLazyQuery } from "@apollo/client";
// import { Helmet } from "react-helmet-async";
// import { useHistory, useLocation } from "react-router-dom";
// import {
//   searchCustomer,
//   searchCustomerVariables,
// } from "../__generated__/searchCustomer";

// const SEARCH_CUSTOMER = gql`
//   query searchCustomer($input: SearchCustomerInput!) {
//     searchCustomer(input: $input) {
//       ok
//       error
//     }
//   }
// `;

// const SearchPage = () => {
//   const location = useLocation();
//   const history = useHistory();
//   const [callQuery, { loading, data, called }] = useLazyQuery<
//     searchCustomer,
//     searchCustomerVariables
//   >(SEARCH_CUSTOMER);

//   useEffect(() => {
//     const [_, query] = location.search.split("?term=");
//     if (!query) {
//       return history.replace("/"); //hitory 내역 사라짐
//       //return history.push("/") //history 내역 존재함
//     }
//     callQuery({
//       variables: {
//         input: {
//           page: 1,
//           query,
//         },
//       },
//     });
//   }, [history, location]);

//   console.log("search loading, data, called:", loading, data, called);

//   return (
//     <div>
//       <Helmet>
//         <title>Search</title>
//       </Helmet>
//       <h1>search page</h1>
//     </div>
//   );
// };

// export default SearchPage;
