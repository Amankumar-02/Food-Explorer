import React from "react"
import ReactDOM from "react-dom"

ReactDOM.createRoot(document.querySelector("#root")).render(
    React.createElement("div", {id:"header"}, [
        React.createElement("div", {id:"child1"}, [
            React.createElement("h1", {}, "I'm an h1 Tag Namaste React from child 1"),
            React.createElement("h2", {}, "I'm an h2 Tag Namaste React from child 1")
        ]),
        React.createElement("div", {id:"child2"}, [
            React.createElement("h1", {}, "I'm an h1 Tag from child 2"),
            React.createElement("h2", {}, "I'm an h2 Tag from child 2")
        ])
    ])
)