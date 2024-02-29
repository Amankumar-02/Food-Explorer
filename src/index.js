import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client"
import App from './App';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import { Body, AboutUs, ContactUs, Error, RestaurantMenu, Shimmer } from "./components/index";

const Grocery = lazy(()=>import('./components/Grocery/Grocery'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>} errorElement={<Error/>}>
            <Route path='/' element={<Body/>}/>
            <Route path='/restaurants/:restId' element={<RestaurantMenu/>}/>
            <Route path='/grocery' element={<Suspense fallback={<Shimmer/>}><Grocery/></Suspense>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.querySelector("#root")).render(
    // <React.StrictMode>
    <RouterProvider router={router}/>
    // </React.StrictMode>
)