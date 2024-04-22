import React from "react";
import Card from "../UI_Elements/Card";
import Button from "../UI_Elements/Button";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { deliveryStatus } from "../constants/deliveryStatus";
import { basicAuthToken } from "../Utilities/getHeaders";
import { useSelector } from "react-redux";
export const headers = () => {
  return {
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      "Content-Type": "application/json",
    },
  };
};
const Orders = ({
  orderId,
  customerId,
  orderStatus,
  productList,
  orderDateAndTime,
  orderTotalAmount,
}) => {
  const storeId = useSelector((store) => store.store.storeId);

  const changeStatus = async (e) => {

    const params = `storeId=${storeId}&customerId=${customerId}&orderId=${orderId}&deliveryStatusId=${e.target.value}`;
    const url = import.meta.env.VITE_UPDATE_ORDER_BY_ORDERID + params;
    try {
      const apiResp = await axios.put(url, "", headers());
      const response = await apiResp.json();
    } catch (error) {
      console.log("encountered error ", error);
    }
  };

  const navigate = useNavigate();

  const viewCustomerOrder = (order, item) => {
    navigate("" + order, {
      state: {
        products: item,
        purchaseDetails: {
          dateOfPurchase: orderDateAndTime,
          orderTotalAmount: orderTotalAmount,
        },
      },
    });
  };
  return (
    <>
      <Card class="w-full rounded">
        <div className="flex text-lg text-stone-900 font-medium  justify-between">
          <div className="flex ">
            <h1 className="">Order #{orderId}</h1>
          </div>
          <div className="flex gap-5">
            <button
            type="button"
              className="py-0 self-center px-2 rounded bg-red-800  text-white text-base "
              title="View Details"
              onClick={() => viewCustomerOrder(orderId, productList)}
            >View</button>

            <span className="">
              Status:
              <select
                onChange={changeStatus}
                className="p-1 focus:outline-none bg-slate-200 rounded"
              >
                {deliveryStatus?.map((deliveryValue) => (
                  <option key={deliveryValue.key} value={deliveryValue.key}>
                    {deliveryValue.value}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className="flex  my-4 gap-5 overflow-auto ">
          {productList?.map((product, index) => {
            return (
              <div
                key={product?.productId + index}
                className="flex p-2 gap-6 min-w-fit justify-start "
              >
                <img
                  src={product?.productImageUrl}
                  width={60}
                  height={60}
                  className="rounded"
                />
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default Orders;
