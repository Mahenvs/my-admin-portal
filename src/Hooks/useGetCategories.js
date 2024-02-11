import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch } from "react-redux";
import axios from "axios";
import { listOfCategories } from "../store/productSlice";

export const useGetCategories = () => {
  const storeId = localStorage.getItem("storeId");
    const dispatch = useDispatch();
  const getCategories = async () => {
    const category_url = import.meta.env.VITE_PRODUCT_CATEGORIES + storeId + "/categories";
    console.log(category_url);
    await axios.get(category_url, getHeaders())
    .then((response) => {

      const data1  = [{categoryId:'null',categoryName:'Open dropdown'},...response.data]
      
      dispatch(listOfCategories(data1));
        // return response.data;
      })
      .catch((error) => {
        // Handle error
      });
    // navigate("/customer");
  };
  useEffect(() => {
    getCategories();

  },[]);
};
