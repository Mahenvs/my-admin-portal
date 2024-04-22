import { Heading } from "../UI_Elements/Heading";
import useGetAllOrders from "../Hooks/useGetAllOrders";
import { useSelector } from "react-redux";
import Orders from "./Orders";
import { Outlet, useLocation } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs";

const OrdersList = () => {
  useGetAllOrders();
  const ordersList = useSelector((store) => store.orderStore.orderData);
  const location = useLocation();
  
  return (
    <div className={`flex flex-col mx-56 mb-4`}>
      <Heading>Order Logs</Heading>
      <BreadCrumbs/>
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
