import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    HashRouter,
    Redirect,
    Link,
} from "react-router-dom";

class Dashboard extends Component {
    render() {
        return <div>Welcome to the app!</div>;
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>App3</h1>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/inbox">Inbox</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

class About extends React.Component {
    render() {
        return <h3>About</h3>;
    }
}

class Inbox extends React.Component {
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox www"}
            </div>
        );
    }
}

// class Message extends React.Component {
//     render() {
//         return <h3>Message {this.props.params.id}</h3>;
//     }
// }

ReactDOM.render(
    <HashRouter>
        <Redirect to="/App" from="/" exact />
        {/* <Route path="/" component={App}></Route> */}
        <App>
            <Route path="/inbox" component={Inbox} />
            <Route path="/about" component={About} />
        </App>
    </HashRouter>,

    document.getElementById("main")
);

if (module.hot && process.env.NODE_ENV !== "production") {
    module.hot.accept();
}
