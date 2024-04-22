import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const BreadCrumbs = ({orderId}) => {

  const location = useLocation();
  console.log(location?.state?.orderId);
  return (
    <div className="gap-10 mt-5 mb-2">
      <Link className="font-sm font-sans font-light ">All Purchases </Link> 
      {location?.state?.orderId  && <>{" /"}
      <span className="font-sm font-sans font-semibold"> Order#{location?.state?.orderId}</span>
      </>}
    </div>
  );
};

export default BreadCrumbs;
