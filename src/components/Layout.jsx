import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import TopNav from "./TopNav";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

export const Layout = () => {
  
  return (
    <div className="flex">
      {/* <NavBar/> */}
      <div className="w-full">
      {/* <TopNav className="  "/>       */}
      <Outlet />
      </div>
    </div>
  );
};
