
import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch,useSelector } from "react-redux";
import { listOfUnits } from "../store/productSlice";
import axios from "axios";

const useGetUnits = () => {
  const dispatch = useDispatch();
    
  const fetchUnitsData = async () => {
     const units_url = import.meta.env.VITE_PRODUCT_UNITS;
    
    await axios.get(units_url, getHeaders())
    .then((response) => {
        console.log(response.data);
        const data1  = [{unitId:'null',unitName:'Open dropdown'},...response.data]
      
        dispatch(listOfUnits(data1));
        // return response.data;
      })
      .catch((error) => {
        // Handle error
      });
    // navigate("/customer");
  };
  useEffect(() => {
   fetchUnitsData();
  }, []);
};

export default useGetUnits;
