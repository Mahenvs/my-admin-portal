import React from "react";
import CustomerNavBar from './CustomerNavBar';
import { Outlet } from "react-router-dom";
import Categories from "./Categories";
import Cart from "./Cart";

const Layout = ({ children }) => {
  return (
    <>
      <CustomerNavBar />
      {/* <div className="w-full flex ">
        <span className="border-r-2  border-gray-500 w-[20%] ">
        <Categories />
        </span>
        <span className="w-[2%] "></span>

        <span className="w-[50%] ml-10 mt-3 ">
        <Outlet />
        <Cart/>
        </span>
      </div> */}
      <div className="w-full flex ">
        <Outlet/>
      </div>

    </>
  );
};

export default Layout;
