import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { listOfProducts } from "../store/productSlice.js";
import { useDispatch,useSelector } from "react-redux";

const useGetProducts = () => {
  const dispatch = useDispatch();
  
  let storeId = useSelector((store) => store.store.storeId);

  if(!storeId){
    storeId = localStorage.getItem("storeId");
  }
  const url = import.meta.env.VITE_API_GET_PRODUCTS+`${storeId}/products`;
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();

      dispatch(listOfProducts(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
   storeId && fetchData();
  }, []);
};

export default useGetProducts;
