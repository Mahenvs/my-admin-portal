import useGetProducts from "../Hooks/useGetProducts";
import { useSelector,useDispatch } from "react-redux";
import Button from "../UI_Elements/Button";
import { listOfProductsSorted } from "../../src/store/productSlice";

export default function ProductsList() {
  useGetProducts();

  const dispatch = useDispatch();
  let productsList = useSelector((store) => store.product.products);
  let sortedProducts = useSelector((store) => store.product.sortedProducts);
  const storeDomain = useSelector((store) => store.customerStore?.storeDomainResource);
  
  if(!sortedProducts){
    sortedProducts = productsList
  }

  const sorthandler = (sortBy) =>{

    if(sortBy == "productName"){
      sortedProducts = [...productsList].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));  
    }
    else
      sortedProducts = [...productsList].sort((a, b) => a[sortBy] - b[sortBy]);
    
    dispatch(listOfProductsSorted(sortedProducts));
  }
  
  const navigateProductDetail = (product) => {
    const newShopUrl = 'http://localhost:5174/'+storeDomain+'/'+product;
    window.open(newShopUrl,'_blank'); 
  };
  return (
    <>

      <div className="m-16  flex flex-col bg-white shadow-lg px-5 text-black">      
        <div className="flex gap-2 justify-end mt-2 mb-4">
          <Button class="bg-red-800" title={"Sort⬆⬇"} onClickButton={()=>sorthandler('productName')}></Button>
          <Button class="bg-red-800" title={"Filter"}></Button>
        </div>
        <div className="justify-between items-center p-2 border-b-2 bg-gray-300 rounded ">
          <div className="flex items-center font-semibold self-center align-middle content-center">
            <span className="w-2/5 " onClick={() => sorthandler('productName')}>Product</span>
            <span className="w-1/5 " onClick={() => sorthandler('productPrice')}>Price</span>
            <span className="w-1/5 " onClick={() => sorthandler('productStockQuantity')}>Stock</span>
            <span className="w-1/5 ">Action</span>
          </div>
        </div>
      {!sortedProducts ? <h1 className="text-2xl text-center p-3 text-gray-800 font-semibold">Please add products</h1> : 
        <>
        {sortedProducts?.map((item, index) => (
          <div key={index} className="flex items-center border-b-2 p-2">
            <span className="w-2/5 p-1 text-md   border-b-1">
              <p className="text-red-600 font-semibold">{item.productName} </p> <p>{item.categoryName}</p>
            </span>

            <span className="w-1/5 p-1 text-md  ">
              $ {item.productPrice}
            </span>
            <span className="w-1/5 p-1 text-md  ">
              {item.productStockQuantity}
            </span>
            <span className="w-1/5 p-1 text-md"
            onClick={() => navigateProductDetail(item?.productName)}>
              <Button title="View" className="rounded">
              View</Button>
              </span>
          </div>
        ))}</>}
        
      </div>
    </>
  );
}
