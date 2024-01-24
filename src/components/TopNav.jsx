import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  
  const currentPath = location.pathname;

  const [navHeading, setNavHeading] = useState();

  useEffect(()=>{
    if(currentPath == '/products'){
      setNavHeading("All Products");
    }
    else if(currentPath == '/add-product'){
      setNavHeading("Add Product");
    }
  },[location])

  console.log(location.pathname.slice(1,location.pathname.length)," ",location);

  

  return (
    <>
      <div className="shadow-lg items-center self-start  px-5 h-12 bg-white-600 flex flex-row w-full my-7 ">
        <h1 className="text-2xl  font-semibold">{navHeading}</h1>
      </div>
    </>
  );
};

export default TopNav;
