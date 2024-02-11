
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";
import { setCurrentPath } from "../store/storeSlice";
import { useDispatch } from "react-redux";

export function RedirectHome() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        handleLogin()
    },[])
    const handleLogin = () => {
      console.log("loggedin",!localStorage.getItem("userId"),!localStorage.getItem("storeId"));
      if (!localStorage.getItem("userId")) {
        navigate(`/auth?signIn`);
        return null;  
      }
      else{
        console.log("loggedin",localStorage.getItem("storeId"));
        setLoggedIn(true);
        if(!localStorage.getItem("storeId")) {
          navigate(`/auth?signIn`);
        }
        else{
          dispatch(setCurrentPath("/products"));
          navigate(`/products`);  
        }      
      }
    };
    // if (isLoggedIn == true) {
    //   navigate(`/products`);
    //   return null; 
    // }

    
    return <RegisterUser  />;
  }