import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setProfileData } from "../store/storeSlice";

export const useGetProfile = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const getProfile = async () => {
    const getInfoUrl = import.meta.env.VITE_USER_GET_INFO + userId;
    
    await axios.get(getInfoUrl, getHeaders())
    .then((response) => {
        dispatch(setProfileData(response.data));
        // return response.data;
      })
      .catch((error) => {
        // Handle error
      });
  };
  useEffect(() => {
    getProfile();

  },[]);
};
