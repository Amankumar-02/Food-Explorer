// import React from "react";
import { Component } from "react";
import UserClassChild from "./UserClassChild";
// import { UserContextStore } from "../../../utils/UserContextStore";

class UserClass extends Component{
    constructor(props){
        super(props);
        // console.log(props);
        this.state = {
            count1 : 1,
            count2 : 2,
            arr : [1,2,3,4,5,6],
            obj : {
                firstName:"Neeraj",
                lastName:"Singh,"
            },
            value:"",
        }
        console.log("Parent Constructor");
    }
    componentDidMount(){
        console.log("Parent Did Mount");
        this.timer = setInterval(()=>{console.log("Interval of 1s inside a class component")}, 1000);
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.count1 !== prevState.count1){
            // code which is written inside useEffect
            //In every render, When the if condition is true the code is execute
            console.log("First condition")
        }
        // for another condition
        if(this.state.count2 !== prevState.count2){
            // code
            console.log("Second condition")
        }
    }
    componentWillUnmount(){
        clearInterval(this.timer);
        console.log("unMount")
    }
    render(){
        const {name, location} = this.props;
        const {count1, count2, arr, obj} = this.state;
        console.log("Parent Render")
        return(
            <>
            <h1>UserClass is render using a class based component.</h1>
            {/* <UserContextStore.Consumer>
                {({logginName})=>{ return(<h1 className="text-xl font-semibold">Loggin User Name: {logginName}</h1>)}}
            </UserContextStore.Consumer> */}
            <div className="user-card">
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: +31 123264</h4>
                <div>
                    <h2>Examples of State Variables</h2>
                    <p>Count1: {count1}</p>
                    <button onClick={()=>{this.setState({count1: this.state.count1+1})}}>Increase Count1</button>
                    <p>Count2: {count2}</p>
                    <button onClick={()=>{this.setState({count2: this.state.count2+1})}}>Increase Count2</button>
                    <hr />
                    {arr.map((item, index)=>(<p key={index}>{item}</p>))}
                    <button onClick={()=>{this.setState({arr:[...arr, arr.slice(-1)[0]+1]})}}>Add new Number</button>
                    <hr />
                    <p>Object: {obj.firstName} {obj.lastName}</p>
                    <input type="text" value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value})}}/>
                    <button onClick={()=>{this.setState({obj:{firstName: this.state.value.split(" ")[0], lastName:this.state.value.split(" ")[1]}, value:"",})}}>Add value to Object</button>
                </div>
            </div>
            <UserClassChild uniqueId={"First"}/>
            <UserClassChild uniqueId={"Second"}/>
            </>
        )
    }
}

export default UserClass