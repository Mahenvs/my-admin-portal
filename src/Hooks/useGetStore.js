import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch,useSelector } from "react-redux";

const useGetStore = (storeDomain) => {
  const dispatch = useDispatch();
   
  const url = import.meta.env.VITE_API_GET_STORE_CUST+storeDomain;
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      
      console.log(result);

    //   dispatch(listOfProducts(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
};

export default useGetStore;
