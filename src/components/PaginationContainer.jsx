import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const PaginationContainer = () => {
  const { metaInfo } = useLoaderData();
  const { page, pageCount } = metaInfo.pagination;
  const { search, pathname } = useLocation(); // getting the relative path and the query params for search
  const navigate = useNavigate();

  const allPages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  }); // creating the pagination in the frontend

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search); // creating an instance to get the search query params value that is put inside the URLSearchParams
    searchParams.set("page", pageNumber); // add/set the page & number to the existing search params
    navigate(`${pathname}?${searchParams.toString()}`); // combine both the relative pathname and the new created search params together in the query string
  };

  if (pageCount < 2) return null; // display nothing when the page count is less than 2

  return (
    <>
      <div className=" flex items-center justify-end join mt-12 mb-5">
        <button
          className=" btn btn-xs md:btn-sm join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount; // when page is less than 1 the new value for prev should be the page count which is the end.
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {allPages.map((pageNumber, index) => {
          return (
            <button
              className={` btn btn-xs md:btn-sm join-item ${
                pageNumber === page && " bg-base-300 border-base-300"
              }`}
              onClick={() => handlePageChange(pageNumber)}
              key={index}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className=" btn btn-xs md:btn-sm join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1; // when the next page is bigger than the page count which is the last page then next should move to page 1
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationContainer;
