import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumber.map((number) => (
        <li key={number}>
          <a onClick={() => paginate(number)}>{number}</a>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
