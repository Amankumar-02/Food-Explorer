import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client"
import App from './App';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import { Body, AboutUs, ContactUs, Error, RestaurantMenu, Shimmer, RestaurantFoodCart, SearchRoute, SearchRestaurants } from "./components/index";

const Grocery = lazy(()=>import('./components/Grocery/Grocery'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>} errorElement={<Error/>}>
            <Route path='/' element={<Body/>}/>
            <Route path='/restaurants/:restId' element={<RestaurantMenu/>}/>
            <Route path='/search' element={<SearchRoute/>}/>
            <Route path='/search/:restSearchId' element={<SearchRestaurants/>}/>
            <Route path='/grocery' element={<Suspense fallback={<Shimmer/>}><Grocery/></Suspense>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/cart' element={<RestaurantFoodCart/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.querySelector("#root")).render(
    // <React.StrictMode>
    <RouterProvider router={router}/>
    // </React.StrictMode>
)