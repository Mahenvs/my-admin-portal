import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Heading } from "../UI_Elements/Heading";

const OrderView = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state);

  return (
    <div className="shadow-lg shadow-slate-400 flex flex-col  my-4 gap-5 overflow-auto p-3 border-gray-500 rounded">
      <h1 className="font-bold text-2xl">Purchase Details</h1>
      <div className="flex justify-between font-medium font-xl pb-1 border-b">
        <span>Date of Purchase: {orderData?.purchaseDetails?.dateOfPurchase}</span>
        <span >Amount: ${orderData?.purchaseDetails?.orderTotalAmount}</span>
      </div>
      <span className="border-b font-medium pb-3">Total Items: {orderData?.products?.length}</span>
      {orderData?.products?.map((product, index) => {
        return (
          <div
            key={product?.productId + index}
            className="flex p-2 gap-6 min-w-fit justify-around border-b pb-2"
          >
            <img
              src={product?.productImageUrl}
              width={80}
              height={80}
              className="rounded"
            />
            <section className="list-none py-1 text-base  w-full pl-1">
              <div className="flex gap-8">
              <li className="">{product?.productName}</li>
              <li className="font-medium">${product?.price}</li>
              </div>
              <li>Qty:{product?.quantity}</li>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default OrderView;
