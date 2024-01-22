import Cart from "./Cart";
import Categories from "./Categories";

export default function Home(){
    return <>
        <span className="border-r-2  border-gray-500 w-[20%] ">
        <Categories />
        </span>
            <span className="w-[2%] "></span>
            <span className="w-[50%] ml-10 mt-3 ">
        <Cart/>
        </span>
    </>
}