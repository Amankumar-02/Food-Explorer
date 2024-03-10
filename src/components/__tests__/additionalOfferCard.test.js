import RestaurantCard, { AdditionOfferRestaurantCard } from "../RestaurantCard/RestaurantCard";
import mockRestData from '../mocks/mocks';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

test("Should AdditionOfferRestaurantCard Component Render", ()=>{
    const RestaurantCardOffer = AdditionOfferRestaurantCard(RestaurantCard)
    render(
        <BrowserRouter>
            <RestaurantCardOffer items={mockRestData}/>
        </BrowserRouter>
    )
    const offer = screen.getByText("60% OFF UPTO ₹120");
    expect(offer).toBeInTheDocument();
})