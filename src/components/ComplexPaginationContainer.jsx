import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { metaInfo } = useLoaderData();
  const { page, pageCount } = metaInfo.pagination;
  const { search, pathname } = useLocation(); // getting the relative path and the query params for search
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search); // creating an instance to get the search query params value that is put inside the URLSearchParams
    searchParams.set("page", pageNumber); // add/set the page & number to the existing search params
    const newURL = `${pathname}?${searchParams.toString()}`; // combine both the relative pathname and the new created search params together in the query string
    console.log("Navigating to:", newURL);
    navigate(newURL);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={` btn btn-xs md:btn-sm join-item ${
          activeClass && " bg-base-300 border-base-300"
        }`}
      >
        {pageNumber}
      </button>
    );
  }; // a mini component for adding the pagination button into the page

  const renderPageButton = () => {
    const pageButtons = []; // an empty page buttons array

    // First Page Button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 })); // adding the first button using the mini component (addPageButton) into the page buttons array

    // display this button as long as the page is less than 2
    if (page > 2) {
      // First Dots Section
      pageButtons.push(
        <button className=" join-item btn btn-xs md:btn-sm" key="dots-1">
          ...
        </button>
      );
    }

    // Active/Current Page Button
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    } // adding the middle active/current button using the mini component (addPageButton) into the page buttons array as long as the page is not the first & last page

    // display this button as long as the page not the last page
    if (page < pageCount - 1) {
      // Last Dots Section
      pageButtons.push(
        <button className=" join-item btn btn-xs md:btn-sm" key="dots-2">
          ...
        </button>
      );
    }

    // Last Page Button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    ); // adding the last button using the mini component (addPageButton) into the page buttons array
    return pageButtons; // display the page buttons
  };

  if (pageCount < 2) return null; // display nothing when the page count is less than 2

  return (
    <>
      <div className=" flex items-center justify-end join mt-12 mb-5">
        <button
          className=" btn btn-xs md:btn-sm join-item"
          onClick={() => {
            console.log("Prev button clicked");
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount; // when page is less than 1 the new value for prev should be the page count which is the end.
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {/* displaying the buttons for pagination */}
        {renderPageButton()}
        <button
          className=" btn btn-xs md:btn-sm join-item"
          onClick={() => {
            console.log("Next button clicked");
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

export default ComplexPaginationContainer;
