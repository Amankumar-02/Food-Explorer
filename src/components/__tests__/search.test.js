import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Body from '../Body/Body';
import MOCK_DATA from '../mocks/mockFetchData.json';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(()=>
    Promise.resolve({
        json: ()=>
            Promise.resolve(MOCK_DATA),
    })
);

describe("Should render the body component", ()=>{
    it("Should render the body component with text.", async()=>{
        await act(async ()=>render(
                <BrowserRouter>
                    <Body/>
                </BrowserRouter>)
        );
        const text = screen.getByText("Top restaurant chains in Delhi");
        // console.log(text);
        expect(text).toBeInTheDocument();
    });

    it("Should render the body component with search pizza.", async()=>{
        await act(async ()=>render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>)
        );
        const myRestCardBefore = screen.getAllByTestId("test-myRestCard");
        expect(myRestCardBefore.length).toBe(29);
        const searchBtn = screen.getByRole("button", {name:"Go"});
        const searchInput = screen.getByTestId("test-search-id");
        fireEvent.change(searchInput, {target:{value: "pizza"}});
        fireEvent.click(searchBtn);
        const myRestCard = screen.getAllByTestId("test-myRestCard");

        // expect(searchBtn).toBeInTheDocument();
        // expect(searchInput).toBeInTheDocument();
        expect(myRestCard.length).toBe(13);
    });
    it("Should render the body component with top rated restaurants present", async()=>{
        await act(async ()=>render(
            <BrowserRouter>
                <Body/>
            </BrowserRouter>)
        );
        const myRestCardBefore = screen.getAllByTestId("test-myRestCard");
        expect(myRestCardBefore.length).toBe(29);
        const ratedBtn = screen.getByTestId("test-button-id");
        fireEvent.click(ratedBtn);
        const myRestCardAfter = screen.getAllByTestId("test-myRestCard");
        expect(myRestCardAfter.length).toBe(28);

    });
})