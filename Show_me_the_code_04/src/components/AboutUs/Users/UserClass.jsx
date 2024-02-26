import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        const {name, location} = this.props;
        return(
            <>
            <h1>UserClass is render using a class based component.</h1>
            <div className="user-card">
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: +31 123264</h4>
            </div>
            </>
        )
    }
}

export default UserClass