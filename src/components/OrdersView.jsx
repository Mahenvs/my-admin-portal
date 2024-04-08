import { Heading } from "../UI_Elements/Heading";
import useGetAllOrders from "../Hooks/useGetAllOrders";

const OrdersView = () => {
  useGetAllOrders();
  
  return (
    <div className={`flex flex-col mx-56 gap-10 mb-10`}>

      <Heading>Your Orders</Heading>
      {/* {ordersList?.length > 0 ? (ordersList?.map((item,index) => {
        return <ViewOrders item={item} key={item?.orderId}/>
      })) : <Heading
       class="flex justify-center p-3">No Orders Found</Heading> } */}
    </div>
  );
};

export default OrdersView;
