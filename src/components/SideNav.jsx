// import { NavLink } from 'react-router-dom';
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeaders } from "../Utilities/getHeaders";
import { useEffect } from "react";
import { setCurrentPath, setName, setStoreId, setStoreImg } from "../store/storeSlice";
import Button from "../UI_Elements/Button";
import { setStoreDomain } from "../store/customerSlice";
import { useState } from "react";

const list = [
  { name: "Products List", to: "/products" },
  { name: "Add Product", to: "/add-product" },
  { name: "All Orders", to: "/order-view" },
  { name: "View Profile", to: "/update-profile" },
];

const SideNav = () => {
  const dispatch = useDispatch();
  let storeId = useSelector((store) => store.store.storeId);

  if (!storeId) {
    storeId = localStorage.getItem("storeId");
  }
  const url = import.meta.env.VITE_GET_STORE_BY_ID + `${storeId}`;

  const name = useSelector((store) => store.store.name);
  const pathIs = useSelector((store) => store.store.currentPath);
  const imageIs = useSelector((store) => store.store.storeImg);
  const [storeDomainIn, setDomain] = useState();

  const fetchStoreData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      dispatch(setName(result[0].name));
      document.title = result[0].name?.toUpperCase() + "-ADMIN";
      dispatch(setStoreDomain(result[0].domainResource));
      dispatch(setStoreId(result[0].id));
      dispatch(setStoreImg(result[0].storeImageUrl))
      setDomain(result[0].domainResource);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openShop = () => {
    const newShopUrl = import.meta.env.VITE_CUST_URL + storeDomainIn;
    // const newShopUrl = 'http://localhost:'+port+storeDomainIn;
    window.open(newShopUrl, "_blank");
  };
  const handleCurrentPath = (path) => {
    dispatch(setCurrentPath(path));
  };
  const location = useLocation();

  useEffect(() => {
    dispatch(setCurrentPath(location.pathname))
    fetchStoreData();
  }, []);

  return (
    <div className="w-[208px] h-screen gap-[24px]">
      <section className="flex justify-around px-1 py-2.5 border-b border-gray-300 my-4 w-50">
        <img src={imageIs} alt="" width={40} height={40}/>
        <span className=" text-red-500 self-center text-center font-semibold text-base truncate">
          {name?.toUpperCase()}
        </span>
        <button
          onClick={openShop}
          type="button"
          className="bg-gray-600 self-center px-2 py-0 font-mono text-lg rounded-md text-teal-50"
          title={"Redirects to customer portal"}
        >↗</button>
      </section>
      <div className="gap-[4px] flex flex-col items-center text-center m-auto align-middle min-h-fit ">
        {list.map((item, index) => (
          <li
            key={index}
            className={
              pathIs === item?.to
                ? "text-center align-middle inline items-center rounded-sm px-2 bg-gray-200 w-full "
                : "list-none"
            }
            onClick={() => handleCurrentPath(item?.to)}
          >
            <NavLink
              to={item.to}
              className={
                pathIs === item?.to
                  ? "text-lg font-normal text-slate-800 rounded-sm px-1 bg-gray-200 w-full flex justify-center p-2"
                  : " p-2 flex rounded-sm px-2 text-white text-lg"
              }
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
