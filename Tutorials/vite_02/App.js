import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.querySelector("#root")).render(
    React.createElement("div", {id:"header"}, [
        React.createElement("div", {id:"child1", key:"childKey1"}, [
            React.createElement("h1", {key:"subChild1"}, "I'm an h1 Tag Namaste React develop using vite from child 1"),
            React.createElement("h2", {key:"subChild2"}, "I'm an h2 Tag Namaste React develop using vite from child 1")
        ]),
        React.createElement("div", {id:"child2", key:"childKey2"}, [
            React.createElement("h1", {key:"subChild3"}, "I'm an h1 Tag from child 2"),
            React.createElement("h2", {key:"subChild4"}, "I'm an h2 Tag from child 2")
        ])
    ])
)