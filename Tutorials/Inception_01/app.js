let root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
    React.createElement("div", {id:"header"}, [
        React.createElement("div", {id:"child1"}, [
            React.createElement("h1", { }, "Hello world")
        ]),
        React.createElement("div", {id:"child2"}, [
            React.createElement("button", {onClick: () => window.location.href = "https://www.google.com/"}, "Hello world")
        ]),
    ])
)