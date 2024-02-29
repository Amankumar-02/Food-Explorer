import React from "react"
import ReactDOM from "react-dom/client"


//React CreateElement
// ReactDOM.createRoot(document.querySelector("#root")).render(
//     React.createElement("div", {id:"header"}, [
//         React.createElement("div", {id:"child1", key:"childKey1"}, [
//             React.createElement("h1", {key:"subChild1"}, "I'm an h1 Tag Namaste React from child 1"),
//             React.createElement("h2", {key:"subChild2"}, "I'm an h2 Tag Namaste React from child 1")
//         ]),
//         React.createElement("div", {id:"child2", key:"childKey2"}, [
//             React.createElement("h1", {key:"subChild3"}, "I'm an h1 Tag from child 2"),
//             React.createElement("h2", {key:"subChild4"}, "I'm an h2 Tag from child 2")
//         ])
//     ])
// )

// React Functional Component
function DemoFunc(){
    return(
        <>
        <Title/>
        <div id="header">
            <div id="child1">
                <h1>I'm an h1 Tag Namaste React from child 1</h1>
                <h2>I'm an h2 Tag Namaste React from child 1</h2>
            </div>
            <div id="child2">
                <h1>I'm an h1 Tag from child 2</h1>
                <h2>I'm an h2 Tag from child 2</h2>
            </div>
        </div>
        </>
    )
}

//component composition
// passing a component into an another components
const Title = ()=>{
    return(
        <>
        <h1>Title Component</h1>
        </>
    )
}


ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <DemoFunc/> 
        <DemoFunc></DemoFunc>
    </React.StrictMode>
)