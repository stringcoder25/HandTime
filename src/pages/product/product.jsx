import { useEffect, useState } from "react";
import ProductSeaction from "../productSeaction";
import { getCategories } from "../../utils/helper";

export default function Product() {
    const [productData, setProductData] = useState()
    const [prodCate,setProdCate] = useState()

    function getProduct() {
      fetch("https://dummyjson.com/products",{
        method : "get"
      }).then(res=>res.json()).then(data=>{
        setProductData(data)
        let prod_cate = getCategories(data.products)
        setProdCate(prod_cate)
      })
    }

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <>
            {prodCate?.map((item,index)=><ProductSeaction Categories={item} productData={productData} key={index}/>)}
        </>
    )
}