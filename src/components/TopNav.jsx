import { useRef } from "react";
import { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";

const TopNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showLogOut, setLogOut] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [navHeading, setNavHeading] = useState();

  useEffect(() => {
    if (currentPath == "/products") {
      setNavHeading("All Products");
    } else if (currentPath == "/add-product") {
      setNavHeading("Add Product");
    }else if (currentPath == "/add-category") {
      setNavHeading("Add Category");
    }
    else if (currentPath == "/order-view") {
      setNavHeading("Add Orders");
    }else if (currentPath == "/update-profile") {
      setNavHeading("Store Profile");
    }
  }, [location]);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setLogOut(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  
  const logOutHandler = () =>{
    localStorage.removeItem("userId");
    navigate("/auth?signIn")
  }
  return (
    <div className="w-full relative  sm:mt-0" ref={dropdownRef}>
      <div className="shadow-lg text-center items-center px-5 h-[4.8rem] bg-white-600 flex flex-row w-full justify-between">
        <h1 className="text-2xl font-semibold">{navHeading}</h1>
        <button
          className="font-medium"
          onClick={() => setLogOut((val) => !val)}
        >
          <span className="hidden sm:inline">Account</span>
          <span className="sm:hidden">⚙️</span>
        </button>
      </div>

      {showLogOut && (
        <div className="absolute top-12 right-5 p-3 border border-gray-300 z-20 bg-white rounded mt-2">
          <div className="flex border-b py-3" onClick={handleCheckboxChange}>
            <span className="cursor-pointer">Store Status </span>
            <input
              type="checkbox"
              id="myCheckbox"
              onChange={handleCheckboxChange}
              className="opacity-0 cursor-pointer"
              checked={isChecked}
            />
            <label className="cursor-pointer flex items-center">
              <div
                className={`px-2 text-white border border-gray-400 text-wrap w-fit rounded mr-2 
                ${isChecked ? "bg-green-500" : "bg-red-500"}`}
              >{isChecked ? "Open" : "Close"}</div>
            </label>
          </div>
          <button className="pt-2 cursor-pointer" onClick={logOutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default TopNav;
