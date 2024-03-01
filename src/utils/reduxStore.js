import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../reduxFeatures/cartSlice';

export const reduxStore = configureStore(
    {
        reducer: {
            cartStore : cartSlice,
        },
    }
)