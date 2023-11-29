// Cart.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData, updateData } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import  loadScript  from "../payments/script"


const CartComponent = () => {
    const navigate = useNavigate()
    const [cart_data, setCart_Data] = useState([])
    const dispatch = useDispatch()
    let data = useSelector((store) => store.cartData.value)

    const price = cart_data?.reduce((total, value) => total + value.price * value.Qty, 0)
    const shippingcharge = data.length ? 20 : 0

    useEffect(() => {
        if (data) {
            setCart_Data(data)
        }
    }, [data])

    // item delete in cart
    function itemDel(id) {
        dispatch(deleteData(id))
    }

    function editProductQty(data) {
        dispatch(updateData(data))
    }

    async function checkOut(e) {
        e.preventDefault()
        let id = localStorage.getItem('id')
        if (id) {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            // const result = await axios.post("");

            // if (!result) {
            //     alert("Server error. Are you online?");
            //     return;
            // }

            const obj = { amount: price, id: 1245882 }

            const options = {
                key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
                amount: obj.amount.toString(),
                name: "Soumya Corp.",
                description: "Test Transaction",
                order_id: obj.id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: obj.id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    console.log(data);
                },
                prefill: {
                    name: "Soumya Dey",
                    email: "SoumyaDey@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Soumya Dey Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();


        } else {
            navigate("/login")
        }

    }

    return (
        <>
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 className="mb-3">
                                                <a href="#!" className="text-body">
                                                    <i className="fa fa-long-arrow-alt-left me-2" />
                                                    Continue shopping
                                                </a>
                                            </h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1">Shopping cart</p>
                                                    <p className="mb-0">You have {cart_data?.length} items in your cart</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0">
                                                        <span className="text-muted">Sort by:</span>{" "}
                                                        <a href="#!" className="text-body">
                                                            price <i className="fa fa-angle-down mt-1" />
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            {cart_data?.map((item, index) => <div className="card mb-3" key={index}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <img
                                                                    src={item?.thumbnail}
                                                                    className="img-fluid rounded-3"
                                                                    alt="Shopping item"
                                                                    style={{ width: 65 }}
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5>{item?.title}</h5>
                                                                <p className="small mb-0">256GB, Navy Blue</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div style={{ width: 100 }} className='d-flex ms-5'>
                                                                <button className='btn btn-info ms-2' disabled={item?.Qty <= 1 ? true : false} onClick={() => { editProductQty({ id: item.id, type: "decrement" }) }}>-</button>
                                                                <h5 className="fw-normal mb-0">{item.Qty}</h5>
                                                                <button className='btn btn-info me-2' onClick={() => { editProductQty({ id: item.id, type: "increment" }) }}>+</button>
                                                            </div>
                                                            <div style={{ width: 80 }}>
                                                                <h5 className="mb-0">${item?.price * item?.Qty}</h5>
                                                            </div>
                                                            <div style={{ color: "#cecece", cursor: "pointer" }} onClick={() => { itemDel(item?.id) }}>
                                                                <i className="fa fa-trash" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="card text-white rounded-3" style={{ backgroundColor: "#8019c8" }}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Card details</h5>
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                            className="img-fluid rounded-3"
                                                            style={{ width: 45 }}
                                                            alt="Avatar"
                                                        />
                                                    </div>
                                                    <p className="small mb-2">Card type</p>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <i className="fa fa-cc-mastercard fa-2x me-2" />
                                                    </a>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <i className="fa fa-cc-visa fa-2x me-2" />
                                                    </a>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <i className="fa fa-cc-amex fa-2x me-2" />
                                                    </a>
                                                    <a href="#!" type="submit" className="text-white">
                                                        <i className="fa fa-cc-paypal fa-2x" />
                                                    </a>
                                                    <form className="mt-4">
                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeName"
                                                                className="form-control form-control-lg"
                                                                siez={17}
                                                                placeholder="Cardholder's Name"
                                                            />
                                                            <label className="form-label" htmlFor="typeName">
                                                                Cardholder's Name
                                                            </label>
                                                        </div>
                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeText"
                                                                className="form-control form-control-lg"
                                                                siez={17}
                                                                placeholder="1234 5678 9012 3457"
                                                                minLength={19}
                                                                maxLength={19}
                                                            />
                                                            <label className="form-label" htmlFor="typeText">
                                                                Card Number
                                                            </label>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">
                                                                    <input
                                                                        type="text"
                                                                        id="typeExp"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="MM/YYYY"
                                                                        size={7}
                                                                        minLength={7}
                                                                        maxLength={7}
                                                                    />
                                                                    <label className="form-label" htmlFor="typeExp">
                                                                        Expiration
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">
                                                                    <input
                                                                        type="password"
                                                                        id="typeText"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="●●●"
                                                                        size={1}
                                                                        minLength={3}
                                                                        maxLength={3}
                                                                    />
                                                                    <label className="form-label" htmlFor="typeText">
                                                                        Cvv
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <hr className="my-4" />
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <p className="mb-2">${price}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Shipping</p>
                                                        <p className="mb-2">${shippingcharge}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total(Incl. taxes)</p>
                                                        <p className="mb-2">${price + shippingcharge}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-block btn-lg"
                                                    >
                                                        <div className="d-flex justify-content-between" onClick={checkOut}>
                                                            <span>${price + shippingcharge}</span>
                                                            <span>
                                                                Checkout{" "}
                                                                <i className="fa fa-long-arrow-right ms-2" />
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default CartComponent;
