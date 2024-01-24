const Cart = () => {
  return (
    <div className="f lex p-2 ">
      <section className="flex justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button>Clear Cart</button>
      </section>
      <div className="flex mt-5 justify-between">
        <section className="font-mono">
          <p>Parleg</p>
          <p>$3</p>
        </section>
        <section className="self-end justify-end flex px-3 ">
          
          <button className=" h-fit  border border-gray-400 px-2 rounded">-</button>
          <button className=" h-fit  border-gray-800 px-2">  {"1"}</button>
          <button className=" h-fit  border border-gray-400 px-2 rounded">+</button>
          
        </section>
      </div>
    </div>
  );
};
export default Cart;
