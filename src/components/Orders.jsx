import React, { useEffect } from "react";
import Card from "../UI_Elements/Card";
import Button from "../UI_Elements/Button";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { deliveryStatus } from "../constants/deliveryStatus";
import { basicAuthToken } from "../Utilities/getHeaders";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../store/orderSlice";
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
  const dispatch = useDispatch();
  const changeStatus = async (e) => {
    const { key } = deliveryStatus.find((item) => e.target.value == item.value);

    const params = `storeId=${storeId}&customerId=${customerId}&orderId=${orderId}&deliveryStatusId=${key}`;
    const url = import.meta.env.VITE_UPDATE_ORDER_BY_ORDERID + params;
    try {
      const apiResp = await axios.put(url, "", headers());
      console.log(apiResp);
      const response = await apiResp.data;
      console.log(response);
      dispatch(updateOrder(response));
    } catch (error) {
      console.log("encountered error ", error);
    }
  };

  const navigate = useNavigate();

  const viewCustomerOrder = (order, item) => {
    navigate("" + order, {
      state: {
        products: item,
        orderId: order,
        purchaseDetails: {
          dateOfPurchase: orderDateAndTime,
          orderTotalAmount: orderTotalAmount,
        },
      },
    });
  };
  return (
    <>
      <Card class="w-10/12 sm:w-full rounded shadow-slate-400 shadow-md mb-8 ">
        <div className="flex text-lg g ap-10 sm:gap-0 text-stone-900 font-medium justify-between">
          <div className="flex ">
            <h1 className="">Order #{orderId}</h1>
          </div>
          <div className="flex gap-1 sm:gap-5 justify-items-end flex-col sm:flex-row">

            <div className="">
              <span className="hidden sm:inline">Status:</span>
              <select
                value={orderStatus}
                onChange={changeStatus}
                className="p-1 focus:outline-none bg-slate-200 rounded
                max-w-fit
                "
              >
                {deliveryStatus?.map((deliveryValue) => (
                  <option key={deliveryValue.key} className="text-sm sm:text-lg md:text-xl" value={deliveryValue.value}>
                    {deliveryValue.value}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="py-0 self-end sm:self-center px-2 rounded bg-red-800  text-white text-base "
              title="View Details"
              onClick={() => viewCustomerOrder(orderId, productList)}
            >
              <span className="flex text-right end-0 sm:hidden ">👁️</span>
              <span className="sm:inline hidden ">View</span>

            </button>

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
