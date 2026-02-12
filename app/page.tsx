
"use client"; 

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/productSlice";
import { RootState, AppDispatch } from "./store/store";
import ProductList from "./components/productList";
import UserComponent from "./components/userComponent";
import Learn from "./components/learn";

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



https://jsonplaceholder.typicode.com/users




  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Redux Products</h1>
      <ProductList products={products} />
      <UserComponent/>
    
   <Learn/>

     

    </div>
  );
}

