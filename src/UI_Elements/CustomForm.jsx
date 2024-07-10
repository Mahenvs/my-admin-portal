import React from "react";

const CustomForm = ({ children, class1 }) => {
  return (
    <div className="mx-auto sm:w-1/3  py-1 sm:py-10 sm:flex block mt-10 sm:justify-center sm:items-center h-screen">
      <form
        id="loginModal"
        className={`border-zinc-100 rounded   px-12 py-2 sm:py-4 justify-center flex flex-col text-white  ${class1}`}
      >
        {children}
      </form>
    </div>
  );
};

export default CustomForm;
