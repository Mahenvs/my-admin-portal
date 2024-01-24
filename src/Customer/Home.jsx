import useGetStore from "../Hooks/useGetStore";
import Cart from "./Cart";
import Categories from "./Categories";
import CustomerViewProducts from "./CustomerViewProducts";
import {useLocation} from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  console.log(pathArr[pathArr.length-1]);
  
  const storeDomain = pathArr[pathArr.length-1];
  

  useGetStore(storeDomain);

  return (
    <div className="flex w-full">
      <span className="border-r-2 w-1/4 h-screen border-gray-500  ml-40">
        <Categories />
      </span>
      <span className="w-2/4 border-r-2 mx-5">
      <CustomerViewProducts/>
      </span>
      <span className="w-1/4  mx-2 mr-40">
        <Cart />
      </span>
    </div>
  );
}
