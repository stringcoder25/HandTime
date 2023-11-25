import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function ProductSeaction({productData,Categories}) {

let product = productData?.products?.filter(item=>item.category === Categories)

console.log(product);
  return (
    <>
      <section className="product_section ">
        <div className="container">
          <div className="product_heading">
            <h2>{Categories}</h2>
          </div>
          <div className="product_container">
            {product?.map((item,index)=><ProductCard prod={product} item={item} key={index}/>)}
          </div>
        </div>
      </section>
    </>)
}