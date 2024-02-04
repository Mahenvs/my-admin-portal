
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";

export function RedirectHome() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    useEffect(()=>{
        handleLogin()
    })
    const handleLogin = () => {
      if (localStorage.getItem("userId") != undefined) {
        console.log("loggedin");
        setLoggedIn(true);
      }
    };
    if (isLoggedIn == true) {
      navigate(`/products`);
      return null; 
    }

    
    return <RegisterUser  />;
  }