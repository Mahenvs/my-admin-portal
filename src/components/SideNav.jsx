// import { NavLink } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeaders } from "../Utilities/getHeaders";
import { useEffect } from "react";
import { setCurrentPath, setName, setStoreId } from "../store/storeSlice";
import Button from "../UI_Elements/Button";
import { setStoreDomain } from "../store/customerSlice";
import { useState } from "react";

const list = [
  { name: "Products List", to: "/products" },
  { name: "Add Product", to: "/add-product" },
  { name: "View Profile", to: "/update-profile" }
  
];

const SideNav = () => {
  const dispatch = useDispatch();
  let storeId = useSelector((store) => store.store.storeId);

  if(!storeId){
    storeId = localStorage.getItem("storeId");
    console.log(storeId);
  }
  const url = import.meta.env.VITE_GET_STORE_BY_ID+`${storeId}`;

  const name = useSelector((store) => store.store.name);
  const pathIs = useSelector((store) => store.store.currentPath);

  const [storeDomainIn, setDomain] = useState();

  const   fetchStoreData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      dispatch(setName(result[0].name));
      document.title = result[0].name+"-admin";
      dispatch(setStoreDomain(result[0].domainResource));
      dispatch(setStoreId(result[0].id));
      setDomain(result[0].domainResource);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openShop = () =>{
    const port =import.meta.env.VITE_API_PORT;
    const newShopUrl = 'http://localhost:'+port+storeDomainIn;
    window.open(newShopUrl, '_blank');
    
  }
  const handleCurrentPath = (path) =>{
    dispatch(setCurrentPath(path));
  }

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <div className="w-[208px] h-screen gap-[24px]">
      <section className="flex p-3 border-b border-gray-400 my-4 w-50">
        <span className=" text-red-500 mx-auto self-center text-center font-semibold text-base truncate">
          {name} 
        </span><Button onClickButton={openShop} class="px-[0.7rem] py-0" title={"↗"}></Button>
      </section>
      <div className="gap-[4px] flex flex-col items-center text-center m-auto align-middle min-h-fit ">
      {/* <li className={activeCategory === item?.categoryId  ? "p-1 bg-gradient-to-r from-white to-blue-200 w-full" : "bg-white p-1"} 
              onClick={() => handleActiveCategory(item?.categoryId)}>
                <NavLink to={"?categoryId="+item?.categoryId}>
                  {item?.categoryName}({item?.productCount}) 
                </NavLink>
              </li> */}
        {list.map((item, index) => (
          <li key={index} className={pathIs === item?.to ? "text-center align-middle inline items-center rounded-sm px-2 bg-gray-200 w-full " : "list-none"}
          onClick={()=>handleCurrentPath(item?.to)}>
            <NavLink
              to={item.to}
              className={pathIs === item?.to ? "text-lg font-normal text-slate-800 rounded-sm px-1 bg-gray-200 w-full flex justify-center p-2" : " p-2 flex rounded-sm px-2 text-white text-lg"}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
