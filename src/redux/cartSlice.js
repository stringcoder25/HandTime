import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "cartSlice",
    initialState: {
        value: []
    },
    reducers: {
        addData: (state, action) => {
            let data = action.payload
            state.value = [...state.value, data]
        },
        deleteData: (state, action) => {
            let id = action.payload
            state.value = state.value.filter((item) => item.id !== id)
        },
        updateData: (state, action) => {
            const { id, type, Qty } = action.payload
            let index = state.value.findIndex((item) => item.id === id)
            if (type === 'increment') {
                state.value[index].Qty++
            }

            if (type === "decrement") {
                if (state.value[index].Qty !== 1) {
                    state.value[index].Qty--
                }
            }

        }
    }
})

export const { addData, deleteData, updateData } = slice.actions
export default slice.reducer