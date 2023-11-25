import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux/cartSlice";

const store = configureStore({
    reducer : {
        cartData: cartSlice,
        Allproduct : ""
    }
})

export default store;