import React from "react";
import SideNav from './SideNav';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      {/* <NavBar />
      <div className="w-full flex ">
        <span className="border-r-2  border-gray-500 w-[20%] ">
        <SideNav />
        </span>
        <span className="w-[2%] "></span>

        <span className="w-[50%] ml-10 mt-3 ">
        <Outlet />
        </span>
      </div> */}
    </>
  );
};

export default Layout;
