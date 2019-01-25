import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Home from './Home.js'
import About from './Router/Home.js';
import Index from './Router/Index.js';
import Users from './Router/Users.js';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />

        </div>
      </Router>
    );
  }
}

// class Index extends App {
//   render() {
//     return (
//       <div>
//         <h2>Home</h2>
//       </div>
//     );
//   }
// }


// class About extends App {
//   render() {
//     return (
//       <div>
//         <h2>About</h2>
//       </div>
//     );
//   }
// }

// class Users extends App {
//   render() {
//     return (
//       <div>
//         <h2>Users</h2>
//       </div>
//     );
//   }
// }

// const Index = () => <h2>Home</h2>;
// const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>;