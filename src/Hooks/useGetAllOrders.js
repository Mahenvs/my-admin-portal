import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/orderSlice";

const useGetAllOrders = () => {
  const dispatch = useDispatch();

  let storeId = useSelector((store) => store.store.storeId);
  const fetchOrdersData = async () => {
    const url =
      import.meta.env.VITE_API_GET_ORDERS +
      "?storeId=" +
      storeId;
    try {
      const response = await fetch(url, getHeaders());
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
       dispatch(setOrders(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    storeId && fetchOrdersData();
  }, [storeId]);
};

export default useGetAllOrders;
