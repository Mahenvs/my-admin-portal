import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export const RootLayout = () => {
  return (
    <div className="flex">
      <NavBar/>
      <Outlet />
    </div>
  );
};
