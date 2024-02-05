import React from "react";

const CustomForm = ({ children, class1 }) => {
  return (
    <div className="mx-auto w-1/3 py-10 flex justify-center items-center h-screen">
      <form
        id="loginModal"
        className={`border-zinc-100 rounded   px-12 py-4 justify-center  flex flex-col text-white  ${class1}`}
      >
        {children}
      </form>
    </div>
  );
};

export default CustomForm;
