import React from "react";
import { gql, useQuery } from "@apollo/client";
import MainStructure from "../components/mainStructure";
import Pagination from "../components/pagination";

const TEST_QUERY = gql`
  query {
    users {
      data {
        id
        name
        email
      }
    }
  }
`;

interface IUser {
  id: number;
  name: string;
  email: string;
}
const OptionPage = () => {
  const { loading, error, data, refetch } = useQuery(TEST_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }
  const totalMembers = 1321;
  const users = data.users.data;
  const reverse = users.slice().sort((a: IUser, b: IUser) => b.id - a.id);
  const halfUsers = Math.ceil(reverse.length / 2);
  const firstHalf = reverse.slice(0, halfUsers);
  const secondHalf = reverse.slice(-halfUsers);
  return (
    <MainStructure>
      <>
        <div className="infoWrap grid grid-cols-2">
          <div className="memberWrap mt-2 pr-1 bg-white">
            <div className="headerWrap flex justify-between items-center px-5 py-3 bg-gray-700 text-white">
              <h3>01 분양톡 멤버</h3>
              <p>TOTAL: {totalMembers}명</p>
            </div>
            <div className="searchWrap flex justify-between items-center p-5">
              <div className="inputWrap border-b border-1 border-gray-100">
                <input
                  className=""
                  placeholder="이름이나 연락처로 검색해 주세요"
                />
              </div>
              <button className="px-3 border border-1 bg-gray-700 text-white">
                검색
              </button>
            </div>
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
                    {firstHalf.map((user: IUser) => {
                      return (
                        <tr
                          className="border-b border-1 text-center"
                          key={user.id}
                        >
                          <td>{user.name}</td>
                          <td>010-1234-1234</td>
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
                    {secondHalf.map((user: IUser) => {
                      return (
                        <tr
                          className="border-b border-1 text-center"
                          key={user.id}
                        >
                          <td>{user.name}</td>
                          <td>010-1234-1234</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination totalPage={3} />
          </div>
          <div className="alarmtalkSendWrap mt-2 pl-1 bg-white">
            <div className="headerWrap p-3 bg-gray-700 text-white">
              <h3>02 분양톡 발송</h3>
            </div>
            <div className="sendingInputWrap p-5">
              <textarea
                className="p-5 w-full border border-dotted border-1 border-gray-700"
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
          <button className="m-1 p-2 col-start-2 col-end-3 bg-gray-700 text-white">
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

export default OptionPage;
