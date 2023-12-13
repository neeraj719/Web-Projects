import React from "react";
import Blogs from './Blogs'
import Header from './Header'
import Pagination from "./Pagination"

const FullPage = () => {
  return (
    <div>
      <div className="mt-[40px]">
        <Header />
        <Blogs />
        <Pagination />
      </div>
    </div>
  );
};

export default FullPage;