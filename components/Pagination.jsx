import Link from "next/link";
import React from "react";


const Pagination = ({ page, pageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <section className="mx-auto container flex justify-center items-center my-8">
      {page > 1? (<Link
        href={`properties?page=${page - 1}`}
        className="mr-2 border rounded border-gray-300 px-2 py-1"
      >
        Previous
      </Link>):null}
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page <totalPages? (
        <Link
        href={`properties?page=${page + 1}`}
        className="ml-2 border rounded border-gray-300 px-6 py-1"
      >
        Next
      </Link>
      ):null}
    </section>
  );
};

export default Pagination;
