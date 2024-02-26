import { Component } from "react";

class UserClassChild extends Component{
    constructor(props){
        super(props);
        console.log("Child Constructor");
    }
    componentDidMount(){
        console.log("Child Did Mount");
    }
    render(){
        console.log("Child Render");
        return(
            <>
            <h1>Child Class Component</h1>
            </>
        )
    }
}

export default UserClassChild;