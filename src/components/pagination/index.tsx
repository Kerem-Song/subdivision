import React, { useState } from "react";

interface IPagination {
  totalPage?: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalPage,

  page,
  setPage,
}: IPagination) => {
  // 페이지 리스트 불러오는 쿼리 or dispatch
  // useEffect(() => {
  //   handleUserStories(pageInfo);
  // }, [pageNo]);

  if (!totalPage) {
    return <div></div>;
  }

  const pageArr = [];

  for (let i = 1; i <= totalPage; i++) {
    pageArr.push(i);
  }

  const handlePage = (e: React.MouseEvent<HTMLElement>) => {
    const page = e.currentTarget.dataset.page;
    const pageNum = Number(page);

    setPage(pageNum);
  };

  const handlePageIndex = (e: React.MouseEvent<HTMLElement>) => {
    const action = e.currentTarget.dataset.action;

    if (action === "prev") {
      return setPage((current) => current - 1);
    } else if (action === "next") {
      return setPage((current) => current + 1);
    }
  };

  return (
    <div className="paginationWrap flex justify-center items-center">
      <ul className="pagination flex justify-center items-center">
        <li className="page-item p-3">
          {page > 1 ? (
            <a
              className="page-link"
              href="#"
              data-action="prev"
              onClick={handlePageIndex}
            >
              prev
            </a>
          ) : (
            <div></div>
          )}
        </li>
        <li className="p-3">
          {pageArr.map((v) => {
            return (
              <a
                className="page-link p-3"
                href="#"
                data-page={v}
                onClick={handlePage}
                key={v}
              >
                {v}
              </a>
            );
          })}
        </li>
        <li className="page-item p-3">
          {page !== totalPage ? (
            <a
              className="page-link"
              href="#"
              data-action="next"
              onClick={handlePageIndex}
            >
              Next
            </a>
          ) : (
            <div></div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
