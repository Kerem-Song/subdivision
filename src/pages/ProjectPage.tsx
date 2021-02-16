import React from "react";
import { gql, useQuery } from "@apollo/client";
import Pagination from "../components/pagination";
import MainStructure from "../components/mainStructure";

interface IUser {
  id: number;
  name: string;
  email: string;
}

let refetchData;

const ProjectPage = () => {
  // const { loading, error, data, refetch } = useQuery(Me);

  // refetchData = refetch;

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>error...</p>;
  // }

  // const users = data.users.data;
  // const reverse = users.slice().sort((a: IUser, b: IUser) => b.id - a.id);
  // console.log("projectPage data:", data);

  return (
    <MainStructure>
      <div className="projectWrap bg-white mt-2">
        <h3 className="px-5 py-3 bg-gray-600 text-white">프로젝트 관리</h3>
        <div className="proejctInputWrap flex m-5 bg-white">
          <div className="projectMakeWrap flex justify-center items-center">
            <div className="px-3 bg-gray-100">
              <p>프로젝트 생성</p>
            </div>
            <div className="pl-3">
              <input
                className="border border-1 border-gray-100"
                placeholder="생성할 프로젝트 입력"
              />
            </div>
            <button className="px-3 border border-gray-400">생성</button>
          </div>
          <div className="projectSearchWrap flex justify-center items-center pl-24">
            <div className="border border-1 border-gray-100">
              <input placeholder="이름이나 연락처로 검색해주세요"></input>
            </div>
            <button className="px-3 border border-1 bg-gray-700 text-white">
              검색
            </button>
          </div>
        </div>
        <div className="projectListWrap p-5 devide-y devide-lightblue-500">
          <table className="border-t border-1">
            <thead className="border-b border-1">
              <tr>
                <th>NO</th>
                <th>프로젝트명</th>
                <th>담당자 연락처</th>
                <th>아이디</th>
                <th>패스워드</th>
                <th>홈페이지URL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((user: IUser) => {
                return (
                  <tr className="border-b border-1 text-center" key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.name}</td>
                    <td>{user.id}</td>
                    <td>1234</td>
                    <td>www.lunasoft.co.kr</td>
                    <td>
                      <button>확인</button>
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
        {/* <div>{data}</div> */}
        <Pagination totalPage={3} />
      </div>
    </MainStructure>
  );
};

export default ProjectPage;
