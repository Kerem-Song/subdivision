import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useQuery } from "@apollo/client";
import MainStructure from "../components/mainStructure";
import {
  CustomersQuery,
  CustomersQueryVariables,
} from "../__generated__/CustomersQuery";
import { useForm } from "react-hook-form";
import Pagination from "../components/pagination";
import { divisionArr } from "../utils/divisionArr";

const CUSTOMERS_QUERY = gql`
  query CustomersQuery($searchCustomerInput: SearchCustomerInput!) {
    customers(input: $searchCustomerInput) {
      ok
      error
      totalPages
      data {
        phoneNumber
        name
      }
    }
  }
`;

interface ICustomers {
  totalPages?: number;
  phoneNumber: string;
  name: string;
}

interface IFormProps {
  searchTerm: string;
  alarmTalkText: string;
}

const AlarmTalkPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const history = useHistory();

  const { data, loading, error, refetch } = useQuery<
    CustomersQuery,
    CustomersQueryVariables
  >(CUSTOMERS_QUERY, {
    variables: {
      searchCustomerInput: {
        pageNo: page,
        pageSize: pageSize,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, [data]);

  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  if (!data.customers?.data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">
          User Data Loading...
        </span>
      </div>
    );
  }

  const {
    customers: { data: customersData, totalPages },
  } = data;

  const [firstHalf, secondHalf] = divisionArr(customersData, 2);

  return (
    <MainStructure>
      <>
        <Helmet>
          <title>알람톡</title>
        </Helmet>
        <div className="alarmtalkWrap grid grid-cols-2">
          <div className="memberWrap mt-2 mr-1 bg-white">
            <div className="headerWrap flex justify-between items-center px-5 py-3 bg-gray-700 text-white">
              <h3>01 분양톡 멤버</h3>
              <p>TOTAL: {customersData.length}명</p>
            </div>
            <form
              className="searchWrap flex w-full items-center p-5"
              onSubmit={handleSubmit(onSearchSubmit)}
            >
              <div className="border-b border-1 border-gray-100">
                <input
                  className="max-w-max"
                  ref={register({ required: true })}
                  name="searchTerm"
                  type="Search"
                  placeholder="이름이나 연락처로 검색"
                />
              </div>
              <button className="px-3 border border-1 bg-gray-700 text-white">
                검색
              </button>
            </form>
            <div className="projectListWrap grid grid-cols-2 p-5 devide-y devide-lightblue-500">
              <div className="tableWrap p-1">
                <table className="border-t border-1">
                  <thead className="border-b border-1">
                    <tr>
                      <th>이름</th>
                      <th>연락처</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstHalf?.map((data: ICustomers) => {
                      return (
                        <tr
                          className="border-b border-1 text-center"
                          key={data.phoneNumber}
                        >
                          <td>{data.name}</td>
                          <td>{data.phoneNumber}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="tableWrap p-1">
                <table className="border-t border-1">
                  <thead className="border-b border-1">
                    <tr>
                      <th>이름</th>
                      <th>연락처</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondHalf?.map((data: ICustomers) => {
                      return (
                        <tr
                          className="border-b border-1 text-center"
                          key={data.phoneNumber}
                        >
                          <td>{data.name}</td>
                          <td>{data.phoneNumber}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination totalPage={totalPages!} page={page} setPage={setPage} />
          </div>
          <div className="alarmtalkSendWrap mt-2 ml-1 bg-white">
            <div className="headerWrap p-3 bg-gray-700 text-white">
              <h3>02 분양톡 발송</h3>
            </div>
            <div className="sendingInputWrap p-5">
              <textarea
                className="p-5 w-full h-60 border border-dotted border-1 border-gray-700"
                placeholder="알림톡 멤버에게 보내실 내용을 작성해주세요 &#13;&#10;엔터키를 입력하시면 자동 줄바꿈이 가능합니다."
              />
            </div>
            <div className="buttonsWrap grid grid-cols-2 p-5">
              <button className="p-2 bg-yellow-300">분양톡 발송</button>
              <button className="p-2 bg-gray-700 text-white">
                분양알람 발송
              </button>
            </div>
          </div>
        </div>
        <div className="buttonsWrap grid grid-cols-5 mt-10">
          <button
            className="m-1 p-2 col-start-2 col-end-3 bg-gray-700 text-white"
            onClick={() => {
              history.push("/createCustomer");
            }}
          >
            분양톡 멤버 추가
          </button>
          <button className="m-1 p-2 col-start-3 col-end-4 bg-white">
            분양톡 멤버 삭제
          </button>
          <button className="m-1 p-2 col-start-4 col-end-5 bg-yellow-600 text-white">
            분양톡 멤버 엑셀 다운로드
          </button>
        </div>
      </>
    </MainStructure>
  );
};

export default AlarmTalkPage;
