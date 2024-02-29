let root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
    <>
    <div id="header">
        <div id="child1">
            <h1>Hello world</h1>
        </div>
        <div id="child2">
            <a href="https://www.google.com/" target="_blank"><button>Click Me</button></a>
        </div>
    </div>
    </>
)