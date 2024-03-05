import { createSlice, current } from "@reduxjs/toolkit";

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
                // return { ...state, cart: modCart };
                state.cart = modCart;
            } else if (taskDis === "increase") {
                const modCart = state.cart.map(item => item.info.name === nameDis ? { ...item, info: { ...item.info, quantity: item.info.quantity + 1 } } : item);
                // return { ...state, cart: modCart };
                state.cart = modCart;
            }
            // return state;
        },
        removeCartItem: (state, action)=>{
            // console.log(current(state))
            const newCart = state.cart.filter(item=>item.info.name !== action.payload);
            state.cart = newCart;
            // console.log(current(state))
        },
        clearCartItems: (state, action)=>{
            state.cart = [];
        },
    }
})

export const { addCartItem, modifyCartQuantity, removeCartItem, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;