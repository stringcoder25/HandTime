import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addData } from "../redux/cartSlice"
import { useDispatch, useSelector } from "react-redux"


export default function ProductCard({ item,prod }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Cartdata = useSelector((store)=>store.cartData.value)
    
   function addToCard(id){
    const data = prod?.find((item)=>item.id===id)
    data.Qty = 1
    dispatch(addData(data))
   }
    return (
        <>
            <div className="box">
                <div className="box-content">
                    <div className="img-box">
                        <img src={item?.thumbnail} alt="" />
                    </div>
                    <div className="detail-box">
                        <div className="text">
                            <h6>{item?.title}</h6>
                            <h5>
                                <span>$</span> {item?.price}
                            </h5>
                        </div>
                        <div className="like">
                            <h6>Like</h6>
                            <div className="star_container">
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-box">
                    {Cartdata?.filter(ele=>ele.id===item.id).length?<button onClick={()=>{navigate('/cart')}}>Go To Cart</button>:<button onClick={()=>{addToCard(item.id)}}>Add To Cart</button>}
                    
                </div>
            </div>
        </>
    )
}