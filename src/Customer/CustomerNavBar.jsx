// import './NavBar.css';
import CustomFormControl from "../UI_Elements/CustomFormControl";
import shop from "../assets/shop.jpg";

const CustomerNavBar = () => {
  return (
    <>
      <div className="flex h-20 border- b border-b-2  items-center">
        <section className="w-1/5 ml-40 mr-10 flex items-center">
          
          <img src={shop} width="50px" />Image
        </section>
        <section className="w-2/5  mx-5">
          <CustomFormControl type="text" title="Search for products" />
        </section>
        <section className="font-medium text-lg w-2/5 flex mx-12 gap-5 text-white-500">
          <span>Categories</span>
          <span>Cart</span>
          <span>Account</span>
        </section>
      </div>
    </>
  );
};

export default CustomerNavBar;
