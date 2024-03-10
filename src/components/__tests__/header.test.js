import Header from '../Header/Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import {reduxStore} from '../../utils/reduxStore';

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path='/' element={<App/>} errorElement={<Error/>}>
//             <Route path='/' element={<Body/>}/>
//             <Route path='/restaurants/:restId' element={<RestaurantMenu/>}/>
//             <Route path='/search/:restSearchId' element={<SearchRestaurants/>}/>
//             <Route path='/grocery' element={<Suspense fallback={<Shimmer/>}><Grocery/></Suspense>}/>
//             <Route path='/about' element={<AboutUs/>}/>
//             <Route path='/contact' element={<ContactUs/>}/>
//             <Route path='/cart' element={<RestaurantFoodCart/>}/>
//         </Route>
//     )
// )

it("Should Header Component with a Cart button", ()=>{
    render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <Header />
        </Provider>
    </BrowserRouter>
    )
    const cartBtn = screen.getByText("Cart");
    expect(cartBtn).toBeInTheDocument();
});
