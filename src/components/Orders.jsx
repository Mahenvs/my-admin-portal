import React from "react";
import Card from "../UI_Elements/Card";
import Button from "../UI_Elements/Button";
import { Outlet, useNavigate } from "react-router-dom";

const Orders = ({ orderId, customerId, orderStatus, productList,orderDateAndTime ,orderTotalAmount}) => {
  console.log(orderId, customerId, orderStatus);

  const changeStatus = (e) => {
    console.log("insdie", e.target.value);
    // Make an API Call
  };

  const navigate = useNavigate();

  const viewCustomerOrder  =(order,item) =>{
    console.log(item);
    navigate(""+order,{ state:{products: item,purchaseDetails:{
      dateOfPurchase: orderDateAndTime,
      orderTotalAmount:orderTotalAmount
    }} })
  }
  return (<>
    <Card class="w-full">
      <div className="flex text-lg text-stone-900 font-medium  justify-between">
        <div className="flex ">
          <h1 className="">Order #{orderId}</h1>
        </div>
        <div className="flex gap-5">
          <Button
            class="border-none p-0 bg-transparent text-red-800 underline"
            title="View"
            onClickButton={()=>viewCustomerOrder(orderId,productList)}
          ></Button>

          <span className="">
            Status:
            <select onChange={changeStatus}>
              <option value={"Completed"}> {orderStatus}</option>
              <option value={"Pending"}>Pending</option>
              <option value={"way"}>On the way</option>
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
    </Card></>
  );
};

export default Orders;
