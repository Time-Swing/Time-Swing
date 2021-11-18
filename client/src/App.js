import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';

import PostAgenda from './pages/agenda/PostAgenda';
import AboutUsPage from './pages/AboutUsPage';
import ShowAllAgenda from './pages/agenda/ShowAllAgenda'
import ShowAgenda from './pages/agenda/ShowAgenda';
import './App.css';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">Time Swing</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/agenda/new">
            What is your next agenda?
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


class App extends React.Component {
  
  render() {
    return (
      
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/agenda/new" component={PostAgenda} />
                <Route path="/agenda/:id" component={ShowAgenda} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/" component={ShowAllAgenda} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
