import React from "react";
import shop from "../assets/shop.jpg";
import Button from "../UI_Elements/Button";
const CustomerViewProducts = () => {
  return (
    <div className="shadow-lg p-1 flex gap-4">
      <section className="w-1/4 p-1 border">
        <img src={shop} alt="" width="100px" />
      </section>
      <section className="w-2/4">
        <h1 className="text-lg  text-gray-700 font-medium">IPHONE </h1>
        <p>per piece</p>
        <p>{"$900"} </p>
      </section>
      <section className="justify-end items-end self-end">
      <Button title="Add" class="px-2 h-fit "></Button>
      </section>
    </div>
  );
};

export default CustomerViewProducts;
