import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ pageChangeHandler }) => (
  <ReactPaginate
    previousLabel={"anterior"}
    nextLabel={"siguiente"}
    breakLabel={"..."}
    breakClassName={"break-me"}
    pageCount={20} // Total de páginas
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={pageChangeHandler}
    containerClassName={"pagination"}
    subContainerClassName={"pages pagination"}
    activeClassName={"active"}
  />
);

export default Paginate;
