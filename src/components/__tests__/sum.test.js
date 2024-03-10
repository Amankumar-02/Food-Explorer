// here we create a function 
// which takes two arguments ==> 1st string/ description of the test case, 2nd function/ implimentation of test case

import { sumDummyTestCase } from "../sumDummyTestCase";

// this is how we write a test case
test("Sum Function Should Calculate the sum of two numbers", ()=>{
    const result1 = sumDummyTestCase(5,8);
    const result2 = sumDummyTestCase("Aman", "Kumar");

    //Assertion / the below syntax is mandatory
    expect(result2).toBe("Aman Kumar");
    expect(result1).toBe(13);
})