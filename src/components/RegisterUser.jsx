import { Link, useNavigate } from "react-router-dom";

import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useState } from "react";
import shop from "../assets/shop.jpg";

import { setAdminId, setStoreId } from "../store/storeSlice";
import { useDispatch } from "react-redux";
import CustomForm from "../UI_Elements/CustomForm";
import { compareInputs } from "../Utilities/passwordCompare";
import { validatingInputs } from "../Utilities/validatingFields";

const InitialState = {
  firstName: "",
  email: "",
  password: "",
  cnfpassword: "",
};

export const RegisterUser = () => {
  const signUpUrl = import.meta.env.VITE_USER_SIGN_UP;
  const signInUrl = import.meta.env.VITE_LOGIN;

  const [isLogin, setLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();


  const [formData, setFormData] = useState(InitialState);

  const [isEdited, setEdited] = useState({
    email: false,
    password: false,
    cnfpassword: false,
  });

  const toggleAuth = () => {
    setErrorMsg(null);
    setLogin((isLogin) => !isLogin);
    setFormData(InitialState);
    setEdited({
      email: false,
      password: false,
      cnfpassword: false,
    });
    if (!isLogin) navigate("?signUp");
    else navigate("?signIn");
  };

  const handlerInput = (flag, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [flag]: value,
    }));

    setEdited((prevValues) => ({
      ...prevValues,
      [flag]: true,
    }));
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailError = isEdited.email && !emailPattern.test(formData.email);

  const pswdError = isEdited.password && formData.password.length < 5;
  const navigate = useNavigate();

  async function Register1() {
    const errorIs = validatingInputs(formData);
    setErrorMsg(errorIs);
    if (errorIs.length > 0) {
      return;
    }
    if (!compareInputs(formData.password, formData.cnfpassword)) {
      setErrorMsg("Passwords not matching");
      return;
    }
    const basicAuthToken = btoa(
      `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
    );

    const data = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: "NA",
        phoneNumber: 9999999999,
      }),
    });
    const response = await data.json();
    console.log(data.status, " status ", response.status);
    if (data.status === 201) {
      // dispatch(setAdminId(response.id));
      localStorage.setItem("userId", response?.id);
      navigate("/create-new-shop", {
        state: {
          data: response.id,
        },
      });
    } else {
      setErrorMsg(response.message);

      throw new Error("Status is not 200");
    }
  }

  const Login = async () => {
    const errorIs = validatingInputs(formData);
    setErrorMsg(errorIs);
    if (errorIs.length > 0) {
      return;
    }
    const basicAuthToken = btoa(
      `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
    );


    const data = await fetch(signInUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        storeId:0
      })
    });
    const response = await data.json();

    if (data.status === 200) {
      setErrorMsg(null);

      const data2 = JSON.parse(response.details);
      localStorage.setItem("storeId", data2.storeId);
      dispatch(setAdminId(data2.userId));
      dispatch(setStoreId(data2.storeId));
      localStorage.setItem("userId", data2.userId);
      
      if (data2.storeId == null) {
        navigate("/create-new-shop", {
          state: {
            data: data2.userId,
          },
        });
      } else {
        navigate("/products");
      }
    } else {
      setErrorMsg(response.message);
      throw new Error("Status is not 200");
    }
  };

  return (
    <>
      <CustomForm class1="bg-gray-700">
        <h2 className="flex font-semibold text-[#f7f2f0d1]  items-center mt-4">
          <img src={shop} width="50px" />
          MultiMarketHub
        </h2>
        <h3 className="text-[#f7f2f0d1] text-xl justify-start  mt-[1.5rem] font-bold mb-[1rem]">
          {!isLogin ? "Sign In" : "Sign Up"}
        </h3>

        {isLogin ? (
          <div className="mx-auto">
            <CustomFormLabel label="Name" />
            <CustomFormControl
              // class={mailError ? "error" : ""}
              type="text"
              name="name"
              value={formData.firstName}
              inputChange={(event) =>
                handlerInput("firstName", event.target.value)
              }
            />
          </div>
        ) : (
          ""
        )}

        <CustomFormLabel label="Email" />
        <CustomFormControl
          class={mailError ? "error" : ""}
          type="email"
          name="email"
          value={formData.email}
          inputChange={(event) => handlerInput("email", event.target.value)}
        />
        {mailError && (
          <p className="text-red-500 font-semibold -mt-3 mb-2">
            Enter a valid email address
          </p>
        )}

        <CustomFormLabel label="Password" />
        <CustomFormControl
          class={pswdError ? "error" : ""}
          type="password"
          name="pswd"
          value={formData.password}
          inputChange={(event) => handlerInput("password", event.target.value)}
        />
        {pswdError && (
          <p className="text-red-500 font-semibold -mt-3 mb-2">
            Enter a valid password
          </p>
        )}
        {errorMsg != null && (
          <p className="text-red-500 font-semibold -mt-3 mb-2">{errorMsg}</p>
        )}

        {isLogin ? (
          <>
            <CustomFormLabel label="Confirm Password" />
            <CustomFormControl
              type="password"
              value={formData.cnfpassword}
              inputChange={(event) =>
                handlerInput("cnfpassword", event.target.value)
              }
            />
          </>
        ) : (
          ""
        )}

        <div className="items-center flex justify-between">
          <span>
            {!isLogin ? "Not a member" : "Member already"}?&nbsp;&nbsp;
            <Link
              className="no-underline text-[#f7f2f0d1]"
              onClick={toggleAuth}
            >
              <strong> {!isLogin ? "Sign Up" : "Sign In"}</strong>{" "}
            </Link>
          </span>
          <button
            className="bg-white px-8 font-mono text-lg rounded-md text-black"
            onClick={isLogin ? Register1 : Login}
            type="button"
          >
            {isLogin ? "Join" : "Login"}
          </button>
        </div>
      </CustomForm>
      
    </>
  );
};
