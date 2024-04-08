import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
