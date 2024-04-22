
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
      if (!localStorage.getItem("userId")) {
        navigate(`/auth?signIn`);
        return null;  
      }
      else{
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
    return <RegisterUser  />;
  }