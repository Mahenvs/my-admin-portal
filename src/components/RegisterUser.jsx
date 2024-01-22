import { Link, useNavigate } from "react-router-dom";

import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useState } from "react";
import shop from "../assets/shop.jpg";

import { getHeaders } from "../Utilities/getHeaders";
import axios from "axios";
import { setAdminId, setStoreId } from "../store/storeSlice";
import { useDispatch, useSelector } from "react-redux";

const InitialState = {
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

  const id = useSelector((store) => store.store.adminid);

  const [categoriesList, setCategories] = useState();

  const [formData, setFormData] = useState(InitialState);

  const [isEdited, setEdited] = useState({
    email: false,
    password: false,
    cnfpassword: false,
  });

  const toggleAuth = () => {
    setLogin((isLogin) => !isLogin);
    setFormData(InitialState);
    setEdited({
      email: false,
      password: false,
      cnfpassword: false,
    });
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
  const headers = getHeaders();

  async function Register1() {
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
        lastName: "last",
        phoneNumber: 9469856962,
      }),
    });
    const response = await data.json();

    if(response.status === 200 ){
    // dispatch(setAdminId(response.id));

    navigate("/create-new-shop", {
      state: {
        data: response.id,
      },
    });
    }
    else{
      setErrorMsg(response.message);
      throw new Error("Status is not 200");
    }
  }

  async function getCategories(data2) {
    const category_url =
      import.meta.env.VITE_PRODUCT_CATEGORIES + data2.storeId + "/categories";
    await axios
      .get(category_url, {
        headers: {
          Authorization: headers,
        },
      })
      .then((response) => {

        setCategories(response.data);

        return response.data;
      })
      .catch((error) => {
        // Handle error
      });
    navigate("/customer");
  }

  const Login = async () => {
    const basicAuthToken = btoa(
      `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
    );

    const url = `${signInUrl}?email=${formData.email}&password=${formData.password}`;

    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const response = await data.json();

    if (data.status === 200) {
      setErrorMsg(null);

      const data2 = JSON.parse(response.details);

      // dispatch(setAdminId(data2.userId));
      // dispatch(setStoreId(data2.storeId));

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
      <div className="mx-auto  w-1/3 py-10 flex justify-center ">
        <form
          id="loginModal"
          className="border-zinc-100 rounded bg-gray-700  px-12 py-4 justify-center flex flex-col text-white "
        >
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
                inputBlur={(event) =>
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
            inputBlur={(event) => handlerInput("email", event.target.value)}
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
            inputChange={(event) =>
              handlerInput("password", event.target.value)
            }
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
        </form>
      </div>
    </>
  );
};
