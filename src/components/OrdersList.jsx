import { Heading } from "../UI_Elements/Heading";
import useGetAllOrders from "../Hooks/useGetAllOrders";
import { useSelector } from "react-redux";
import Orders from "./Orders";
import { Outlet, useLocation } from "react-router-dom";

const OrdersList = () => {
  useGetAllOrders();
  const ordersList = useSelector((store) => store.orderStore.orderData);
  console.log(ordersList);
  const location = useLocation();
  console.log(location);
  
  return (
    <div className={`flex flex-col mx-56 gap-10 mb-10`}>
      <Heading>Your Orders</Heading>
      {location.pathname=='/order-view'  ? ordersList?.length > 0 ? (
        ordersList?.map((item, index) => {
          return (
            <Orders
              orderId={item.orderId}
              customerId={item?.customer?.id}
              orderStatus={item?.orderStatus}
              productList={item?.orderedProductList}
              orderDateAndTime={item?.orderDateAndTime}
              orderTotalAmount={item?.orderTotalAmount}
              key={item?.orderId}
            />
          );
        })
      ) : (
        <Heading class="flex justify-center p-3">No Orders Found</Heading>
      ) :
      <Outlet></Outlet>}
    </div>
  );
};

export default OrdersList;
