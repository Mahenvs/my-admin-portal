// import { NavLink } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeaders } from "../Utilities/getHeaders";
import { useEffect } from "react";
import { setName, setStoreId } from "../store/storeSlice";
import Button from "../UI_Elements/Button";
import { setStoreDomain } from "../store/customerSlice";
import { useState } from "react";

const list = [
  { name: "Products List", to: "/products" },
  { name: "Add Product", to: "/add-product" }
];

const SideNav = () => {
  const dispatch = useDispatch();
  // change storeId to const later
  let storeId = useSelector((store) => store.store.storeId);

  if(!storeId){
    storeId = localStorage.getItem("storeId");
    console.log(storeId);
  }
  const url = import.meta.env.VITE_GET_STORE_BY_ID+`${storeId}`;

  const name = useSelector((store) => store.store.name);
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
    const newShopUrl = 'http://localhost:5174/'+storeDomainIn;
    window.open(newShopUrl, '_blank');
    
  }

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <div className="w-[208px] h-screen gap-[24px]">
      <section className="flex p-3 border-b border-gray-400 my-4">
        <span className=" text-red-500 mx-auto self-center text-center font-semibold text-base">
          {name} <Button onClickButton={openShop} class="px-[0.7rem] py-0" title={"↗"}></Button>
        </span>
      </section>
      <div className="gap-[4px]  flex flex-col items-center">
        {list.map((item, index) => (
          <li key={index} className="inline items-center rounded-sm px-2 ">
            <NavLink
              to={item.to}
              className="text-lg leading-5 w-[40px] font-normal text-white"
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
