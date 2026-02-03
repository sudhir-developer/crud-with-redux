
"use client"; 

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/productSlice";
import { RootState, AppDispatch } from "./store/store";
import ProductList from "./components/productList";
import UserComponent from "./components/userComponent";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);


 const [show, setShow]= useState(false);

 const [btn, setBtn] = useState(false);
 const diaBtn=()=>{
  setBtn(!btn);
 }

const [count, setCount] = useState(0);

const countHandle = ()=>{
  setCount(count+1);
}
const countHandleMinus = ()=>{
  setCount(count-1);
}



  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Redux Products</h1>
      <ProductList products={products} />
      <UserComponent/>
    
      
      <button onClick={()=>setShow(prev=>!prev)}>{show? "Hide":"Show"}</button>
      {show && <div>this is div</div>}<br/>


      <button onClick={()=>diaBtn()} disabled={btn}>Click</button>
      <br/>
      

     <button onClick={countHandle}>Increase</button> ===== {count} =====
     <button onClick={countHandleMinus}>Decrease</button>


    </div>
  );
}

