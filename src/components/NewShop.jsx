import { useState } from "react";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import { useLocation, useNavigate } from "react-router-dom";
import { setStoreId } from "../store/storeSlice";
import { useDispatch } from "react-redux";
import { checkFieldEmpty } from "../Utilities/checkFieldEmpty";
import { basicAuthToken } from "../Utilities/getHeaders";

const storeState = {
  name: "",
  address: "",
  adminId: "",
};
const NewShop = () => {
  const createStoreUrl = import.meta.env.VITE_CREATE_STORE;

  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMsgImg, setErrorMsgImg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadedImgUrl, setuploadedImgUrl] = useState(null);
  const [storeData, setStoreData] = useState(storeState);

  const location = useLocation();
  const receivedData = location.state?.data;

  const handleInputChange = (flag, value) => {
    setStoreData((prevValues) => ({
      ...prevValues,
      [flag]: value,
    }));
  };

  const imgUrl = import.meta.env.VITE_API_URL_PRODUCT;

  const handlerInput = async (event, flag) => {
    console.log(event.target.value, event.target.id);
    setStoreData((prevValues) => ({
      ...prevValues,
      [flag]: event.target.value,
    }));
    if (flag == "Image") {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
        },
        body: formData,
        redirect: "follow",
      };
      try {
        const resp = await fetch(
          imgUrl + "/products/images/upload",
          requestOptions
        );
        const result = await resp.text();

        if (resp.status == 200) {
          console.log("62 ",result);
          setuploadedImgUrl(result);
          setErrorMsgImg(null);
        } else {
          console.log("inside");
          setErrorMsgImg(JSON.parse(result)?.detail);
        }
      } catch (error) {
        console.log("error ", error);
        setErrorMsgImg("Image size limit exceeded");
      }
    }
  };

  async function createShop() {
    const username = "user";
    const password = "market";
    const basicAuthToken = btoa(`${username}:${password}`);
    if (!checkFieldEmpty(storeData.name)) {
      setErrorMsg("Store Name cannot be empty");
      return;
    } else if (!checkFieldEmpty(storeData.address)) {
      setErrorMsg("Store Address cannot be empty");
      return;
    }
    const data = await fetch(createStoreUrl, {
      method: "POST",
      body: JSON.stringify({
        name: storeData.name,
        address: storeData.address,
        adminId: receivedData,
        storeImageUrl: uploadedImgUrl,
      }),
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/json",
      },
    });

    const response = await data.json();

    if (data.status === 200) {
      setErrorMsg(null);
      dispatch(setStoreId(response.id));
      localStorage.setItem("storeId", response.id);
      navigate("/products");
    } else {
      if (storeData.name.length < 3) {
        setErrorMsg("Store Name must be minimum of length 3");
      } else if (storeData.address.length < 3) {
        setErrorMsg("Store Address must be minimum of length 3");
      } else {
        setErrorMsg(response.message);
      }
      throw new Error("Status is not 200");
    }
  }
  return (
    <div
      className=" w-full mx-auto pb-6 px-16 bg-gray-800 
    pt-8 my-36 flex flex-col text-white justify-center rounded
    md:w-4/12 md:py-8"
    >
      <form className="bg-gr ay-800 ">
        <span className=" mb-4 text-xl font-bold text-g ray-600  ">
          Almost there!!! Unveil the magic of your shop!
        </span>
        <div className="mb-2 mt-3">
          <label htmlFor="field1" className="block text-sm font-medium ">
            Store Name
          </label>
          <CustomFormControl
            type="text"
            id="store_name"
            title="Store Name"
            extraClass="mb-2"
            inputChange={(event) =>
              handleInputChange("name", event.target.value)
            }
            inputBlur={(event) => handleInputChange("name", event.target.value)}
          />
        </div>
        <div className="mb-2 mt-3">
          <section>
            <label htmlFor="Image" className="block text-sm font-medium ">
              Image
            </label>
            <div className="w-[25rem] rounded-xl text-xl">
              <input
                className="rounded mt-1 mb-2"
                type="file"
                onChange={(e) => handlerInput(e, "Image")}
              />
            </div>
          </section>
          {errorMsgImg != null && (
            <span className="text-red-500 font-semibold flex justify-end">
              {errorMsgImg}
            </span>
          )}
          <input
            type="file"
            className="hidden border focus:outline-none "
            id="file-input"
          />
        </div>
        <div className="mb-2 mt-3">
          <label htmlFor="field2" className="block text-sm font-medium ">
            Address
          </label>
          <CustomFormControl
            type="text"
            id="address_store"
            title="Address"
            extraClass="mb-2"
            inputChange={(event) =>
              handleInputChange("address", event.target.value)
            }
            inputBlur={(event) =>
              handleInputChange("address", event.target.value)
            }
          />
          {errorMsg != null && (
            <p className="text-red-500 font-semibold -mt-3 mb-2">{errorMsg}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg -gray-600 border px-4 font-mono text-lg rounded-md text-teal-50"
            onClick={createShop}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewShop;
