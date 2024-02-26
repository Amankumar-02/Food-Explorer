import { Component } from "react";

class UserClassChild extends Component{
    constructor(props){
        super(props);
        console.log(this.props.uniqueId +" "+ "Child Constructor");
        this.state = {
            fetchData : [],
        }
    }
    async componentDidMount(){
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        this.setState({fetchData : data});
        // console.log(data)
        console.log(this.props.uniqueId +" "+ "Child Did Mount");
    }
    render(){
        console.log(this.props.uniqueId +" "+ "Child Render");
        return(
            <>
            <h1>Child Class Component</h1>
            {!this.state.fetchData? null : (
                <>
                    <p>{this.state.fetchData[0]?.name}</p>
                </>
            )}
            </>
        )
    }
}

export default UserClassChild;