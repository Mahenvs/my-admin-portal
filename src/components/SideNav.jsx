// import { NavLink } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeaders } from "../Utilities/getHeaders";
import { useEffect } from "react";
import { setName } from "../store/storeSlice";
import Button from "../UI_Elements/Button";

const list = [
  { name: "Products List", to: "/products" },
  { name: "Add Product", to: "/add-product" },
];

const SideNav = () => {
  const dispatch = useDispatch();
  const storeId = useSelector((store) => store.store.storeId);
  console.log(storeId);
  const url = import.meta.env.VITE_GET_STORE_BY_ID+`${storeId}`;

  const name = useSelector((store) => store.store.name);
  
  const fetchStoreData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      dispatch(setName(result[0].name));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openShop = () =>{

    const newShopUrl = 'www.google.com';
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
