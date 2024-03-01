import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCartItem: (state, action)=>{
            const newCart = {info : action.payload};
            state.cart.push(newCart); 
        },
        modifyCartQuantity:(state, action)=>{
            const { taskDis, nameDis } = action.payload;
            if (taskDis === "decrease") {
                const modCart = state.cart.map(item => item.info.name === nameDis ? { ...item, info: { ...item.info, quantity: item.info.quantity - 1 } } : item);
                return { ...state, cart: modCart };
            } else if (taskDis === "increase") {
                const modCart = state.cart.map(item => item.info.name === nameDis ? { ...item, info: { ...item.info, quantity: item.info.quantity + 1 } } : item);
                return { ...state, cart: modCart };
            }
            return state;
        }
    }
})

export const { addCartItem, modifyCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;