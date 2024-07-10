import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import TopNav from "./TopNav";

export const RootLayout = () => {
  return (
    <div className="sm:flex">
      <NavBar/>
      <div className="  w-full">
      <TopNav className="  "/>      
      <Outlet />
      </div>
    </div>
  );
};
