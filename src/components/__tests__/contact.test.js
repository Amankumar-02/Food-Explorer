import ContactUs from '../ContactUs/ContactUs';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


//grouping

describe("ContactUs Page Test Case", ()=>{

    it("Should load contactUs component when heading is present", ()=>{
        render(<ContactUs/>);

        //Query
        const headings = screen.getAllByRole('heading');

        // expect(headings).toBeInTheDocument(); XXX
        // expect(headings)  
        // expect(headings.length)
        expect(headings.length).toBe(4);
        
    });

    test("Should load contactUs component when button is present", ()=>{
        render(<ContactUs/>);

        //input Submit is also a button
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
    });

    it("Should load contactUs component when submitInput is present", ()=>{
        render(<ContactUs/>);

        const text = screen.getByText("Submit");

        expect(text).toBeInTheDocument();
    });

    test("Should load contactUs component when placeholderText is present", ()=>{
        render(<ContactUs/>);

        const placeHolder = screen.getByPlaceholderText("Message");

        expect(placeHolder).toBeInTheDocument();
    });

    it("Should load contactUs component when 2 input is present", ()=>{
        render(<ContactUs/>);

        const textboxs = screen.getAllByRole("textbox");
        // console.log(textboxs);

        expect(textboxs.length).toBe(2);

    });

})