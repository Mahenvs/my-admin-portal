
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";

export function RedirectHome() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    useEffect(()=>{
        handleLogin()
    },[])
    const handleLogin = () => {
      console.log(localStorage.getItem("userId") != undefined,"loggedin",!localStorage.getItem("userId"));
      if (!localStorage.getItem("userId")) {
        console.log("loggedin");
        setLoggedIn(true);
        navigate(`/auth?signIn`);
      }
      else{
        navigate(`/products`);
        return null;  
      }
    };
    if (isLoggedIn == true) {
      navigate(`/products`);
      return null; 
    }

    
    return <RegisterUser  />;
  }