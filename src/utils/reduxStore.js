import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from '../reduxFeatures/cartSlice';

export const reduxStore = configureStore(
    {
        reducer: {
            cartStore : cartSliceReducer,
        },
    }
)