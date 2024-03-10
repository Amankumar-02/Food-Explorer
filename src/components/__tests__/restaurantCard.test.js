import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import mockRestData from '../mocks/mocks'
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("RestaurantCard Component Tests", ()=>{
    it("should render RestaurantCard component with props Data name ", ()=>{
        // mock data
        render(
            <BrowserRouter>
            {/* //Add the props name same as original component props name and the prop has to be a single object as same as component receive at every call */}
                <RestaurantCard
                    items={mockRestData} />
            </BrowserRouter>
        )
        const restName = screen.getByText("La Pino'z Pizza");
        const restAddress = screen.getByText("Dwarka");
        expect(restName).toBeInTheDocument();
        expect(restAddress).toBeInTheDocument();
    });
    it("should render RestaurantCard component with props Data address", ()=>{
        // mock data
        render(
            <BrowserRouter>
                <RestaurantCard
                    items={mockRestData} />
            </BrowserRouter>
        )
        const restAddress = screen.getByText("Dwarka");
        expect(restAddress).toBeInTheDocument();
    });
})