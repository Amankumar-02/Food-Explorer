import Header from '../Header/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {reduxStore} from '../../utils/reduxStore'

describe("Should Header Component Test Desc.", ()=>{
    //Method 1
    it("Should render Header Component with a Cart Button is Present", ()=>{
        render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        );
    
        const cartBtn = screen.getByText("Cart");

        // console.log(cartBtn);

        expect(cartBtn).toBeInTheDocument();
    })
    //Method 2
    it("Should render Header Component with a Login Button is Present", ()=>{
        render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        )
        //Here we can pass a second parameter to find the perfect match
        const loginBtn = screen.getByRole("button", {name:"Login"});
        // const loginBtn = screen.getByText("Login");

        expect(loginBtn).toBeInTheDocument();
    })
    //Method 3
    it("Should render Header Component with a Active String is Present", ()=>{
        render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        )
        //Here we can pass regex to find the some similar text
        // const activeStr = screen.getByText("Active Status:");
        //Regex format
        const activeStr = screen.getByText(/Active/);

        expect(activeStr).toBeInTheDocument();
    })
    //Method 4
    it("Should change login button to logout on click", ()=>{
        render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <Header/>
                </Provider>
            </BrowserRouter>
        )
        const loginBtn = screen.getByText("Login");
        // by fireEvent we simulate the events
        fireEvent.click(loginBtn);
        const logout = screen.getByText("Logout");
        expect(logout).toBeInTheDocument();
    })
})