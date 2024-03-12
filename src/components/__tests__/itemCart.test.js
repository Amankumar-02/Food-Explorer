import { fireEvent, render, screen } from "@testing-library/react";
import RestaurantMenu from '../RestaurantMenu/RestaurantMenu';
import Header from "../Header/Header";
import MOCK_DATA from '../mocks/mockFetchMenu.json';
import {reduxStore} from '../../utils/reduxStore';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import RestaurantFoodCart from "../RestaurantFoodCart/RestaurantFoodCart";

global.fetch = jest.fn(()=>
Promise.resolve({
    json: ()=>
        Promise.resolve(MOCK_DATA),
}));

describe("", ()=>{
    it("check the render work", async()=>{
        await act(async()=>render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <RestaurantMenu/>
                </Provider>
            </BrowserRouter>
        ))
        const category = screen.getByText("Gifting Hampers (7)");
        expect(category).toBeInTheDocument();
    });
    it("adding item to cart", async()=>{
        await act(async()=>render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <RestaurantMenu/>
                    <Header/>
                </Provider>
            </BrowserRouter>
        ))
        const headerCartBefore = screen.getByText("Cart")
        expect(headerCartBefore).toBeInTheDocument();

        const food_ItemBefore = screen.getAllByTestId("food-Item");
        expect(food_ItemBefore.length).toBe(20)
        const categoryBtn = screen.getAllByTestId("category-toggle-test");
        fireEvent.click(categoryBtn[1]);
        const food_Item = screen.getAllByTestId("food-Item");
        expect(food_Item.length).toBe(7)

        const addItem = screen.getAllByText("Add");
        fireEvent.click(addItem[2]);
        fireEvent.click(addItem[3]);
        const headerCart = screen.getByText("Cart: 2")
        expect(headerCart).toBeInTheDocument();
    });
    it("check cart items", async()=>{
        await act(async()=>render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <RestaurantMenu/>
                    <Header/>
                    <RestaurantFoodCart/>
                </Provider>
            </BrowserRouter>
        ))
        const cartData = screen.getAllByTestId("cart-item");
        console.log(cartData);
        expect(cartData.length).toBe(2);
        
        const removeBtn = screen.getAllByText("Remove");
        fireEvent.click(removeBtn[1]);
        const cartData2 = screen.getAllByTestId("cart-item");
        console.log(cartData2)
        expect(cartData2.length).toBe(1);
    })
})